import React, {useState} from "react";
import axios from "axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({data}) => {

  const {
    employees,
    setEmployees,
    setEditID,
    setIsEditing,
    editID,
    editItem,
    isEditing
  } = data;
 
  
  console.log("This data is from Table.js")
  console.log(employees)

  axios.defaults.baseURL = 'http://localhost:3500';


 



  const removeItem = (id) => {
    
    const newEployees = employees.filter((item) => {
      return item.id !== id;
    })
    setEmployees(newEployees)
  }
 
    const handleDelete = (id) => {

      axios.delete(`/employees/${id}`)
      .then(response => {
        console.log('Employee deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
    
      removeItem(id)
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
                <td><img id="frame" src={employee.image} alt={employee.image} width="100px" height="100px"/></td>
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
                      onClick={() => handleDelete(employee.id)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editItem(employee.id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
