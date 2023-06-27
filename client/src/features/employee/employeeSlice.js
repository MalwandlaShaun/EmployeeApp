import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  list: [],
  isEditing: false,
  editID: null,
  alert: { show: false, msg: "", type: "" },
};

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    setName: (state, action) => {
      console.log(action.payload);
      state.name = action.payload;
    },

    setList: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    },

    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditID: (state, action) => {
      console.log(action.payload);
      state.editID = action.payload;
    },
    setAlert: (state, action) => {
      console.log(action.payload);
      const { show, msg, type } = action.payload;
      state.alert.show = show;
      state.alert.msg = msg;
      state.alert.type = type;
    },
  },
});

export const { setName, setAlert, setIsEditing, setList, setEditID } =
  todolistSlice.actions;

export default todolistSlice.reducer;
