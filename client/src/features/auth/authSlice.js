import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  isLoading: true,
  isAuthenticated: false,
};

export const login = createAsyncThunk("auth/login", async (_, thunkAPI) => {
  // const { email, password } = thunkAPI.getState().auth;

  console.log(thunkAPI.getState());
  try {
    const response = await axios.post("http://localhost:8000/api/login");
    //const users = response.data;

    const data = await response.json();

    console.log("data is here", data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      window.location.href = "/dashboard";
    } else {
      alert("Please check your username and password");
    }

    // console.log(users);
    // const matchedUser = users.find(
    //   (user) => user.email === email && user.password === password
    // );

    // console.log(matchedUser);
    // if (matchedUser) {
    //   return { success: true };
    // } else {
    //   return { success: false };
    // }
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (_, thunkAPI) => {
    const { name, email, password } = thunkAPI.getState().auth;

    console.log(thunkAPI.getState());
    try {
      //const response = await axios.get("http://localhost:8000/api/register");
      // const existingUsers = response.data;

      // Check if email already exists
      // const userExists = existingUsers.some((user) => user.email === email);
      // console.log("userExists : " + userExists);
      // if (userExists) {
      //   return {
      //     success: false,
      //     error: "Registration failed: Email already exists",
      //   };
      //}

      // If email doesn't exist, proceed with registration
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });

      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setPassword, setEmail, setAuth, setName } = authSlice.actions;

export default authSlice.reducer;
