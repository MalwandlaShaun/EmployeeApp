import React, { useEffect } from "react";
import axios from "axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import "./Table.css";
import {
  setEmployees,
  setIsEditing,
  setEditID,
} from "../features/employee/employeeSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuth } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";

export const Table = React.memo(({ data }) => {
  const { employees } = useSelector((state) => state.employee);
  //console.log("data : ", data);
  // const { setIsLogin } = data.data;
  // useEffect(() => {
  //   console.log("updated");
  // }, [employees]);

  const { setIsLogin } = useAuth();
  const dispatch = useDispatch();
  console.log("This data is from Table.js");
  const allEmployees = employees.employees;

  const navigate = useNavigate();

  const editItem = (id) => {
    dispatch(setIsEditing(true));
    dispatch(setEditID(id));
  };
  const removeItem = (id) => {
    const newEmployees = allEmployees.filter((item) => item._id !== id);
    dispatch(setEmployees(newEmployees));
  };

  const handleLogOut = function logout() {
    // Clear the JWT token from the client
    // localStorage.removeItem("token"); // Or use sessionStorage
    // localStorage.removeItem("user");
    localStorage.clear();
    // Redirect to the login page or perform any other post-logout actions
    // For example:
    setIsLogin(false);
    dispatch(setAuth(false));
    navigate("/login");
    // window.location.href = "/login";
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(
        `https://employee-app4.onrender.com/api/employees/deleteEmployee/${id}`
      )
      .then((response) => {
        alert("Employee deleted");
        console.log("Employee deleted:", response.data);
      })
      .catch((error) => {
        alert("Error deleting Employee");
        console.error("Error deleting employee:", error);
      });

    removeItem(id);
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>profile</th>
            <th className="expand">bio</th>
            <th>name</th>
            <th>surname</th>
            <th>email</th>
            <th>dateOfBirth</th>
            <th>position</th>
            <th>cellPhone</th>
          </tr>
        </thead>
        <tbody>
          {allEmployees?.map((employee, idx) => {
            //console.log(employee._id);

            return (
              <tr key={idx}>
                <td>
                  <img
                    id="frame"
                    src={employee.image}
                    alt={employee.image}
                    width="100px"
                    height="100px"
                  />
                </td>
                <td className="expand">{employee.biography}</td>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.email}</td>
                <td>{employee.dateOfBirth.toString().slice(0, 10)}</td>
                <td>{employee.position}</td>
                <td>{employee.cellPhone}</td>

                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => handleDelete(employee._id)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editItem(employee._id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button type="submit" className="logOutBtn" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
});
