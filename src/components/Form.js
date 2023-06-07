import { useState, useEffect } from "react";

import axios from "axios";

const Form = ({data}) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [biography, setBiography] = useState("");
  const [position, setPosition] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState({});
  const {
    employees,
    setEmployees,
    setEditID,
    setIsEditing,
    editID,
    editItem,
    isEditing,
    selectedImage, 
    setSelectedImage,
   
  } = data;


  useEffect(() => {
    if (isEditing && editID) {
      const employeeToEdit = employees.find((employee) => employee.id === editID);
      setCurrentEmployee(employeeToEdit);
    } else {
      setCurrentEmployee({});
    }
  }, [isEditing, editID, employees]);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;
      setSelectedImage(image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const employeeData = {
          id: new Date().getTime(),
          name,
          surname,
          email,
          image: selectedImage, // Use selectedImage in the form data
          dateOfBirth,
          biography,
          position,
          cellPhone,
      };
  
      if (isEditing) {
        await axios.put(`/employees/${currentEmployee.id}`, employeeData);
        // Handle successful update
      } else {
        await axios.post(`/employees`, employeeData);
        // Handle successful create
      }
  
      // Reset the form fields
      setName("");
      setSurname("");
      setEmail("");
      setImage(null);
      setDateOfBirth("");
      setBiography("");
      setPosition("");
      setCellPhone("");
    } catch (error) {
      console.error(error);
    }
  };
  

  const submitForm = (event) => {
    event.preventDefault();

    handleSubmit();
  };

  return (
    <div className="form-container">
      <h1>Employee Details</h1>

      <form method="post" action="http://localhost:3005/Employee/" runat="server" >
        <div className="form-content">
          <label htmlFor="name"> Name :</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <label htmlFor="surname"> Surname :</label>
          <input
            id="surname"
            type="text"
            placeholder="Enter Your Surname"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />

          <label htmlFor="email"> Email Address :</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email Adress"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />


            <label htmlFor="name">Upload image:</label>
            <input
              id="frame"
              type="file"
              name="image"
              onChange={handleImageUpload} // Use the handleImageUpload function
            />
          
            

          <label htmlFor="name"> Date Of Birth :</label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Enter your Date Of Birth"
            onChange={(event) => {
              setDateOfBirth(event.target.value);
            }}
          />

          <label htmlFor="name"> Biography :</label>
          <textarea
            id="myTextarea"
            name="message"
            rows="4"
            cols="50"
            placeholder="Enter your Biography"
            onChange={(event) => {
              setBiography(event.target.value);
            }}
          ></textarea>

          <label htmlFor="position"> Position :</label>
          <input
            id="position"
            type="text"
            placeholder="Enter Your Position"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />

          <label htmlFor="phone"> CellPhone Number :</label>
          <input
            id="phone"
            type="number"
            placeholder="Enter Your CellPhone Number"
            onChange={(event) => {
              setCellPhone(event.target.value);
            }}
          />

          <input type="submit" className="submit-btn" onClick={submitForm} />
        </div>
        
      </form>
    </div>
  );
};

export default Form;
