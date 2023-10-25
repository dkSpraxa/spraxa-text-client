import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../config/api";

const baseURL = "http://localhost:8000/api/v1";

//user register
export const userSignup = createAsyncThunk(
  "register",
  async ({ name, email, password, co_password }) => {
    try {
      const res = await axios.post(api.userAPI.register, {
        name,
        email,
        password,
        co_password,
      });

      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);

// user login

export const userLogin = createAsyncThunk(
  "login",
  async ({ email, password }) => {
    try {
      const res = await axios.post(api.userAPI.login, { email, password });

      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);
