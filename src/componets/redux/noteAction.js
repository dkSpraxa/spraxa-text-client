import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../config/api";

const baseURL = "http://localhost:8000/api/v1";

//create new note
export const createNote = createAsyncThunk(
  "create-note",
  async ({ noteData }) => {
    try {
      const res = await axios.post(api.noteAPI.create, { ...noteData });

      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);

//get all notes
export const getAllNotes = createAsyncThunk("notes", async () => {
  try {
    const res = await axios.get(api.noteAPI.getAll);

    return res.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});

//update note

export const noteUpdate = createAsyncThunk(
  "update-note",
  async ({ editId, noteData }) => {
    try {
      const res = await axios.put(`${api.noteAPI.update}/${editId}`, {
        ...noteData,
      });

      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);

//delete note

export const noteDelete = createAsyncThunk(
  "delete-note",
  async ({ deleteId }) => {
    try {
      const res = await axios.delete(`${api.noteAPI.delete}/${deleteId}`);

      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);
