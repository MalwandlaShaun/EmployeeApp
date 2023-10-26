import express from "express";
import {
  createEmployee,
  getEmployeeByUser,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/addEmployee", createEmployee);
router.post("/getEmployeeByUser", getEmployeeByUser);
router.get("/getAllEmployees", getAllEmployees);

//UPDATE
router.patch("/updateEmployee/:id", updateEmployee);

//DELETE
router.delete("/deleteEmployee/:id", deleteEmployee);

export default router;
