import Employee from "../models/employees.model.js";

const createEmployee = async (req, res) => {
  console.log(req.body);
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
};

const getEmployeeByUser = async (req, res, next) => {
  console.log(req.body.userId);
  try {
    const newEmployee = await Employee.find({ userId: req.body.userId });
    res.status(201).json({
      status: "success",
      employee: newEmployee,
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const getAllEmployees = await Employee.find();
    res.status(201).json({
      status: "success",
      employees: getAllEmployees,
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

const updateEmployee = async (req, res, next) => {
  //const EmployeeId = req.body.EmployeeId;
  //const EmployeeId = req.params.id;
  // try {
  //   await Employee.findByIdAndUpdate(
  //     EmployeeId,
  //     { employee: req.body },
  //     { upsert: true }
  //   );
  //   res.status(200).json({ message: "success" });
  // } catch (errors) {
  //   console.log(errors);
  // }
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
};

const deleteEmployee = async (req, res, next) => {
  console.log(req.body);
  try {
    const EmployeeId = req.params.id;
    await Employee.findByIdAndDelete(EmployeeId);
    res.status(200).send({
      message: "Employee deleted successfully",
    });
  } catch (errors) {
    console.log("error : ", errors);
  }
};

export {
  createEmployee,
  getEmployeeByUser,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
};
