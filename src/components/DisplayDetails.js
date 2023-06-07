import { useState } from "react";

import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "Home",
      description: "This is the main page of the website",
      status: "live",
    },
    {
      page: "About Us",
      description: "This page has details about the company",
      status: "draft",
    },
    {
      page: "Pricing",
      description: "Prices for different subscriptions",
      status: "error",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;


import { Table } from "./Table";
import axios from "axios";

function DisplayDetails({employees}){


    axios.defaults.baseURL = 'http://localhost:3500';

    axios.delete('/employees/{employeeId}')
  .then(response => {
    console.log('Employee deleted:', response.data);
  })
  .catch(error => {
    console.error('Error deleting employee:', error);
  });

  const updatedEmployee = () => {


   
    // Add other updated properties here
  };
  
  axios.put('/employees/{employeeId}', updatedEmployee)
    .then(response => {
      console.log('Employee updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating employee:', error);
    });
  



        return(
            <>
             
            <Table />
            </>
        )

}

export default DisplayDetails