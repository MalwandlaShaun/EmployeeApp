require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://Malwandla:Malwandla+1@nodeexpressprojects.s47scgq.mongodb.net/07-EmployeeApp"
);
const User = require("./models/user.model");

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

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
