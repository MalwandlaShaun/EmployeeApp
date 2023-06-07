import Form from './components/Form';
import DisplayDetails from "./components/DisplayDetails"
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [employees, setEmployees] = useState([]) 
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  const editItem = (id) => {
    setIsEditing(true);
    setEditID(id);
  };
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
      <Form data={{
    employees: employees,
    setEmployees: setEmployees,
    setEditID: setEditID,
    setIsEditing: setIsEditing,
    editID: editID,
    editItem : editItem ,
    isEditing: isEditing,
    selectedImage:selectedImage,
    setSelectedImage : setSelectedImage,
    handleImageUpload:handleImageUpload
  }}/>
     <DisplayDetails data={{
    employees: employees,
    setEmployees: setEmployees,
    setEditID: setEditID,
    setIsEditing: setIsEditing,
    editID: editID,
    editItem : editItem ,
    isEditing: isEditing,
    selectedImage:selectedImage,
    setSelectedImage : setSelectedImage,
    handleImageUpload:handleImageUpload
  }} />
    </div>
  );
};

export default App;
