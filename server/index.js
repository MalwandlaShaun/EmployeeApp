import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// Import the required modules as ES modules
import express from "express";
import mongoose from "mongoose";
// import flash from "express-flash";
// import session from "express-session";
// import methodOverride from "method-override";
import cors from "cors";
// import bcrypt from "bcrypt";
// import passport from "passport";

// Import your custom modules with ES module syntax
// import User from "./models/user.model.js";
// import Employee from "./models/employees.model.js";
import employeeRoute from "./routes/employeeRoute.js";
import AuthRoutes from "./routes/authRoutes.js";
// Initialize the Express app
const app = express();

// Enable CORS middleware
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use Express middleware
app.use(express.json({ limit: "50mb" }));
mongoose.connect(process.env.MONGO_URI);

//Routes

app.use("/api/employees", employeeRoute);
app.use("/api/auth", AuthRoutes);
// Use the ES module syntax for importing and configuring routes
// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride("_method"));

// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
//const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const flash = require("express-flash");
// const session = require("express-session");
// const methodOverride = require("method-override");
// const employeeRoute = require("./routes/employeeRoute");
// const cors = require("cors");
// // Enable CORS middleware
// app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json({ limit: "50mb" }));
//app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI);
// const User = require("./models/user.model");
// const Employee = require("./models/employees.model");

// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride("_method"));
// app.use("/api/",employeeRoute);

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.redirect("/login");
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   next();
// }

// const initializePassport = require("./passport.config");
// initializePassport(
//   passport,
//   (email) => User.find(email),
//   (id) => User.find(id)
// );

// app.get("/dashboard", checkAuthenticated, (req, res) => {
//   res.render("index.ejs", { name: req.user.name });
// });

// app.get("/login", checkNotAuthenticated, (req, res) => {
//   res.render("login.ejs");
// });

//app.post;

// app.get("/register", checkNotAuthenticated, (req, res) => {
//   res.render("register.ejs");
// });

// app.post("/register", checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.redirect("/login");
//   } catch {
//     res.redirect("/register");
//   }
// });

// app.delete("/logout", (req, res) => {
//   req.logOut();
//   res.redirect("/login");
// });

// app.post("/api/register", checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.json({ status: "OK" });
//   } catch (error) {
//     res.json({ status: "error", error: "duplicate email value" });
//   }
// });

// app.post(
//   "/api/login",
//   checkNotAuthenticated,
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

// app.post("/api/employees");

// Get all employees
// app.get("/api/employees", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get a specific employee
// app.get("/api/employees/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (employee) {
//       res.json(employee);
//     } else {
//       res.status(404).json({ message: "Employee not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update an employee
// app.patch("/api/employees/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (employee) {
//       Object.assign(employee, req.body);
//       const updatedEmployee = await employee.save();
//       res.json(updatedEmployee);
//     } else {
//       res.status(404).json({ message: "Employee not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.delete("/api/employees/:id", async (req, res) => {
//   try {
//     console.log("Employee ID:", req.params.id);
//     const result = await Employee.deleteOne({ _id: req.params.id });
//     console.log("Delete Result:", result);
//     if (result.deletedCount > 0) {
//       res.json({ message: "Employee deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Employee not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
