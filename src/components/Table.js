import React from "react";
import axios from "axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({employees}) => {

  console.log("This data is from Table.js")
  console.log(employees)

  axios.defaults.baseURL = 'http://localhost:3500';

  
  const handleUpdate = (id)=>{
    const updatedEmployee = {
      name: 'John Doe',
      position: 'Manager',
      // Add other updated properties here
    };
    
    axios.put(`/employees/${id}`, updatedEmployee)
      .then(response => {
        console.log('Employee updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
    
  }
    const handleDelete = (id) => {
      axios.delete(`/employees/${id}`)
      .then(response => {
        console.log('Employee deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
    
    }
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
          {employees.map((employee, idx) => {

           
            return (
              <tr key={idx}>
                <td>text</td>
                <td className="expand">{employee.biography}</td>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.email}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.position}</td>
                <td>{employee.cellPhone}</td>
                



                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={handleDelete(employee.id)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={handleUpdate(employee.id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
