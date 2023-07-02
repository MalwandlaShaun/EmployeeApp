import { useEffect } from "react";

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
  setCurrentEmployee,
  setSelectedImage,
} from "../features/employee/employeeSlice";

const Form = () => {
  const dispatch = useDispatch();

  const {
    name,
    surname,
    email,
    dateOfBirth,
    biography,
    position,
    cellPhone,
    currentEmployee,
    employees,
    editID,
    isEditing,
    selectedImage,
  } = useSelector((state) => state.employee);
  useEffect(() => {
    if (isEditing && editID) {
      const employeeToEdit = employees.find(
        (employee) => employee.id === editID
      );
      dispatch(setCurrentEmployee(employeeToEdit));
    } else {
      dispatch(setCurrentEmployee({}));
    }
  }, [isEditing, editID, employees]);

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
        await axios.put(
          `http://localhost:8000/api/employees/${currentEmployee.id}`,
          employeeData
        );
        // Handle successful update
      } else {
        await axios.post(`http://localhost:8000/api/employees`, employeeData);
        // Handle successful create
      }

      // Reset the form fields
      dispatch(setName(""));
      dispatch(setSurname(""));
      dispatch(setEmail(""));
      //setImage(null);
      dispatch(setDateOfBirth(""));
      dispatch(setBiography(""));
      dispatch(setPosition(""));
      dispatch(setCellPhone(""));
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = (event) => {
    //event.preventDefault();

    handleSubmit();
  };

  return (
    <div className="form-container">
      <h1>Employee Details</h1>

      <form
      // method="post"
      // action="http://localhost:8000/api/employees/"
      // runat="server"
      >
        <div className="form-content">
          <label htmlFor="name"> Name :</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            onChange={(event) => {
              dispatch(setName(event.target.value));
            }}
          />

          <label htmlFor="surname"> Surname :</label>
          <input
            id="surname"
            type="text"
            placeholder="Enter Your Surname"
            onChange={(event) => {
              dispatch(setSurname(event.target.value));
            }}
          />

          <label htmlFor="email"> Email Address :</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email Adress"
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
            placeholder="Enter your Biography"
            onChange={(event) => {
              dispatch(setBiography(event.target.value));
            }}
          ></textarea>

          <label htmlFor="position"> Position :</label>
          <input
            id="position"
            type="text"
            placeholder="Enter Your Position"
            onChange={(event) => {
              dispatch(setPosition(event.target.value));
            }}
          />

          <label htmlFor="phone"> CellPhone Number :</label>
          <input
            id="phone"
            type="number"
            placeholder="Enter Your CellPhone Number"
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
