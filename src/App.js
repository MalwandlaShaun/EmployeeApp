import Form from './components/Form';
import DisplayDetails from "./components/DisplayDetails"
import './App.css';
import { useState, useEffect } from 'react';

//import fs from 'fs-extra';


const url = 'http://localhost:3005/Employee/'

function App() {

  const [employees, setEmployees] = useState([])
  

  const fetchEmployees = async () => {
      
    const response = await fetch("http://localhost:3005/Employee/");
    const data = await response.json();
    
    console.log(data)

  }
  useEffect(() => {
    
            
    fetchEmployees ();
});

  
 const addEmployees = (
    name,
    surname,
    email,
    image,
    dateOfBirth,
    biography,
    position,
    cellPhone)=>{

      
    setEmployees([...employees, {
      name,
      surname,
      email,
      image,
      dateOfBirth,
      biography,
      position,
      cellPhone}])
  }

  console.log(employees)


  // const arrayToJson = (employees, filename) => {
  //   const jsonString = JSON.stringify(array, null, 2);
  //   fs.writeFile(filename, jsonString, (err) => {
  //     if (err) {
  //       console.error('Error writing JSON file:', err);
  //     } else {
  //       console.log('JSON file has been saved.');
  //     }
  //   });
  // };


  return (
    <div className="App">
     <Form addEmployees={addEmployees}/>
    </div>
  );
};

export default App;
