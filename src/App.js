import Form from './components/Form';
import DisplayDetails from "./components/DisplayDetails"
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [employees, setEmployees] = useState([])
  

  const fetchEmployees = async () => {
      
    const response = await fetch("http://localhost:3500/employees");
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



  return (
    <div className="App">
     <Form addEmployees={addEmployees}/>
     <DisplayDetails employees={employees} />
    </div>
  );
};

export default App;
