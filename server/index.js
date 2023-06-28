require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
const User = require("./models/user.model");
const Employee = require("./models/employees.model");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: error, error: "duplicate email value" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch users" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.json({ status: "OK", user: true });
  } else {
    res.json({ status: "error", user: false });
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

//   const employee = new Employee(req.body);
//   const savedEmployee = await employee.save();
//   res.status(201).json(savedEmployee);
// } catch (error) {
//   res.status(400).json({ message: error.message });
// }
// });

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
