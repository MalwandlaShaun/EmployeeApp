import Form from "./Form";
import DisplayDetails from "./DisplayDetails";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { login } from "../features/auth/authSlice";
import { setEmployees } from "../features/employee/employeeSlice";
//import { useEffect } from "react";

function App({ data }) {
  const dispatch = useDispatch();
  console.log("data table : ", data);
  const { employees } = useSelector((state) => state.employee);
  const fetchEmployees = () => {
    axios
      .get("https://employee-app4.onrender.com/api/employees/getAllEmployees")
      .then((response) => {
        const data = response.data;
        console.log(data);

        dispatch(setEmployees(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch a single employee by ID
  const fetchEmployeeById = (employeeId) => {
    axios
      .get(`https://employee-app4.onrender.com/api/employees/${employeeId}`)
      .then((response) => {
        const employee = response.data;
        console.log(employee);

        // Perform actions with the fetched employee (e.g., update state)
        // dispatch(setEmployee(employee));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Create an employee
  const createEmployee = (employeeData) => {
    axios
      .post("https://employee-app4.onrender.com/api/employees", employeeData)
      .then((response) => {
        const createdEmployee = response.data;
        console.log(createdEmployee);

        // Perform actions with the created employee (e.g., update state)
        // dispatch(addEmployee(createdEmployee));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Update an employee
  const updateEmployee = (employeeId, employeeData) => {
    axios
      .patch(
        `https://employee-app4.onrender.com/api/employees/${employeeId}`,
        employeeData
      )
      .then((response) => {
        const updatedEmployee = response.data;
        console.log(updatedEmployee);

        // Perform actions with the updated employee (e.g., update state)
        // dispatch(updateEmployee(updatedEmployee));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete an employee
  const deleteEmployee = (employeeId) => {
    axios
      .delete(`https://employee-app4.onrender.com/api/employees/${employeeId}`)
      .then((response) => {
        console.log(response.data);

        // Perform actions after deleting the employee (e.g., update state)
        // dispatch(deleteEmployee(employeeId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  //console.log("this is the data in the employees array");
  //console.log(employees);

  return (
    <div className="App">
      <Form />
      <DisplayDetails
        data={{
          createEmployee,
          updateEmployee,
          deleteEmployee,
          fetchEmployeeById,
          data,
        }}
      />
    </div>
  );
}

export default App;
