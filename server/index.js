require("dotenv").config();

const express = require("express");
//const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app.use(cors());
// Enable CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
const User = require("./models/user.model");
const Employee = require("./models/employees.model");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: "error", error: "duplicate email value" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    await Employee.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      image: req.body.image,
      dateOfBirth: req.body.dateOfBirth,
      biography: req.body.biography,
      position: req.body.position,
      cellPhone: req.body.cellPhone,
      currentEmployee: req.body.currentEmployee,
      employees: req.body.employees,
      editID: req.body.editID,
      isEditing: req.body.isEditing,
      selectedImage: req.body.selectedImage,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: error, error: "duplicate email value" });
  }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific employee
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an employee
app.patch("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      Object.assign(employee, req.body);
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await employee.remove();
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
