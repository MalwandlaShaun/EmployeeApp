import Form from './components/Form';
import DisplayDetails from "./components/DisplayDetails"
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [employees, setEmployees] = useState([]) 


  const fetchEmployees = () => {

  axios.get('http://localhost:3500/employees')
    .then(response => {
      const data = response.data;
      console.log(data);
      
      setEmployees(data)
    })
    .catch(error => {
      console.error(error);
    });
  
    
  }


  useEffect(() => {  
    fetchEmployees ();
},[]);

console.log("this is the data in the employees array")
  console.log(employees)


  return (
    <div className="App">
      <Form />
     <DisplayDetails employees={employees} />
    </div>
  );
};

export default App;
