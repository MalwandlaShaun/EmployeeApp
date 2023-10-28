import { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setName,
  setSurname,
  setEmail,
  setDateOfBirth,
  setBiography,
  setPosition,
  setCellPhone,
  //setCurrentEmployee,
  setSelectedImage,
} from "../features/employee/employeeSlice";

const Form = () => {
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (event) => {
    setIsTyping(event.target.value !== "");
    // Dispatch your Redux action here if needed
  };
  const dispatch = useDispatch();

  const {
    name,
    surname,
    email,
    image,
    dateOfBirth,
    biography,
    position,
    cellPhone,
    editID,
    isEditing,
    selectedImage,
  } = useSelector((state) => state.employee);

  const useEmployees = useSelector(
    (state) => state.employee.employees.employees
  );
  console.log("isEditing :", isEditing, editID);
  console.log("currentEmployee :", currentEmployee);
  console.log("useEmployees", useEmployees);
  useEffect(() => {
    if (isEditing && editID) {
      const employeeToEdit = useEmployees.find(
        (employee) => employee._id === editID
      );
      setCurrentEmployee(employeeToEdit);
    } else {
      // dispatch(setCurrentEmployee());
      return;
    }
  }, [isEditing, editID, useEmployees]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;
      dispatch(setSelectedImage(image));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const employeeData = {
        name: name === "" ? currentEmployee?.name : name,
        surname: surname === "" ? currentEmployee?.surname : surname,
        email: email === "" ? currentEmployee?.email : email,
        image: selectedImage === null ? currentEmployee?.image : selectedImage, // Use selectedImage in the form data
        dateOfBirth:
          dateOfBirth === "" ? currentEmployee?.dateOfBirth : dateOfBirth,
        biography: biography === "" ? currentEmployee?.biography : biography,
        position: position === "" ? currentEmployee?.position : position,
        cellPhone: cellPhone === null ? currentEmployee?.cellPhone : cellPhone,
      };

      if (isEditing) {
        await axios.patch(
          `https://employee-app4.onrender.com/api/employees/updateEmployee/${currentEmployee._id}`,
          employeeData
        );
        // Handle successful update
      } else {
        await axios.post(
          `https://employee-app4.onrender.com/api/employees/addEmployee`,
          employeeData
        );
        // Handle successful create
      }

      //console.log("employeeData : ", employeeData);
      // Reset the form fields
      dispatch(setName(""));
      dispatch(setSurname(""));
      dispatch(setEmail(""));
      //setImage(null);
      dispatch(setDateOfBirth(""));
      dispatch(setBiography(""));
      dispatch(setPosition(""));
      dispatch(setCellPhone(""));
      window.location.reload();
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

      <form
      // method="post"
      // action="https://employee-app4.onrender.com/api/api/employees/"
      // runat="server"
      >
        <div className="form-content">
          <label htmlFor="name"> Name :</label>
          <input
            id="name"
            type="text"
            placeholder={isEditing ? currentEmployee?.name : "Enter Your Name"}
            //value={currentEmployee?.name}
            onChange={(event) => {
              dispatch(setName(event.target.value));
            }}
          />

          <label htmlFor="surname"> Surname :</label>
          <input
            id="surname"
            type="text"
            placeholder={
              isEditing ? currentEmployee?.surname : "Enter Your Surname"
            }
            onChange={(event) => {
              dispatch(setSurname(event.target.value));
            }}
          />

          <label htmlFor="email"> Email Address :</label>
          <input
            id="email"
            type="email"
            placeholder={
              isEditing ? currentEmployee?.email : "Enter your Email Adress"
            }
            onChange={(event) => {
              dispatch(setEmail(event.target.value));
            }}
          />

          <label htmlFor="name">Upload image:</label>
          <input
            id="frame"
            type="file"
            name="image"
            onChange={(e) => handleImageUpload(e)} // Use the handleImageUpload function
          />

          <label htmlFor="name"> Date Of Birth :</label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Enter your Date Of Birth"
            onChange={(event) => {
              dispatch(setDateOfBirth(event.target.value));
            }}
          />

          <label htmlFor="name"> Biography :</label>
          <textarea
            id="myTextarea"
            name="message"
            rows="4"
            cols="50"
            placeholder={
              isEditing ? currentEmployee?.biography : "Enter your Biography"
            }
            onChange={(event) => {
              dispatch(setBiography(event.target.value));
            }}
          ></textarea>

          <label htmlFor="position"> Position :</label>
          <input
            id="position"
            type="text"
            placeholder={
              isEditing ? currentEmployee?.position : "Enter Your Position"
            }
            onChange={(event) => {
              dispatch(setPosition(event.target.value));
            }}
          />

          <label htmlFor="phone"> CellPhone Number :</label>
          <input
            id="phone"
            type="number"
            placeholder={
              isEditing
                ? currentEmployee?.cellPhone
                : "Enter Your CellPhone Number"
            }
            onChange={(event) => {
              dispatch(setCellPhone(event.target.value));
            }}
          />

          <input
            type="submit"
            className="submit-btn"
            onClick={(e) => submitForm(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
