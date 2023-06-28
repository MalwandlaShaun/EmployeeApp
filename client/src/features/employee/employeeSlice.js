import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  email: "",
  image: "",
  dateOfBirth: "",
  biography: "",
  position: "",
  cellPhone: "",
  currentEmployee: {},
  employees: [],
  editID: null,
  isEditing: false,
  selectedImage: null,
};

// const initialState = {
//   name: "",
//   list: [],
//   isEditing: false,
//   editID: null,
//   alert: { show: false, msg: "", type: "" },
// };

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
      state.name = action.payload;
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
    editItem: (state, action) => {
      setIsEditing(true);
      setEditID(action.payload);
    },
  },
});
// const todolistSlice = createSlice({
//   name: "todolist",
//   initialState,
//   reducers: {
//     setName: (state, action) => {
//       console.log(action.payload);
//       state.name = action.payload;
//     },

//     setList: (state, action) => {
//       console.log(action.payload);
//       state.list = action.payload;
//     },

//     setIsEditing: (state, action) => {
//       state.isEditing = action.payload;
//     },
//     setEditID: (state, action) => {
//       console.log(action.payload);
//       state.editID = action.payload;
//     },
//     setAlert: (state, action) => {
//       console.log(action.payload);
//       const { show, msg, type } = action.payload;
//       state.alert.show = show;
//       state.alert.msg = msg;
//       state.alert.type = type;
//     },
//   },
// });

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
  editItem,
} = employeeSlice.actions;

export default employeeSlice.reducer;
