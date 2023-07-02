import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  email: "",
  image: "",
  dateOfBirth: "",
  biography: "",
  position: "",
  cellPhone: null,
  currentEmployee: {},
  employees: [],
  editID: null,
  isEditing: false,
  selectedImage: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setBiography: (state, action) => {
      state.biography = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setCellPhone: (state, action) => {
      state.cellPhone = action.payload;
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setEditID: (state, action) => {
      state.editID = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    handleImageUpload: (state, action) => {
      setSelectedImage(action.payload);
    },
  },
});

export const {
  setName,
  setSurname,
  setIsEditing,
  setEmail,
  setEditID,
  setDateOfBirth,
  setBiography,
  setPosition,
  setCellPhone,
  setCurrentEmployee,
  setEmployees,
  setSelectedImage,
  handleImageUpload,
} = employeeSlice.actions;

export default employeeSlice.reducer;
