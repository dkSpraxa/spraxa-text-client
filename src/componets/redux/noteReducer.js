import { createSlice } from "@reduxjs/toolkit";
import { createNote, getAllNotes, noteDelete, noteUpdate } from "./noteAction";

const noteReducer = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      //create new note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createNote.rejected, (state) => {
        state.loading = false;
      })

      //all notes

      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
      })
      .addCase(getAllNotes.rejected, (state) => {
        state.loading = false;
        state.notes = [];
      })

      //update note

      .addCase(noteUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(noteUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter((ele) => {
          if (ele._id === action.payload.note._id) {
            return action.payload.note;
          } else {
            return ele;
          }
        });
      })
      .addCase(noteUpdate.rejected, (state) => {
        state.loading = false;
        state.notes = [];
      })

      //delete note

      .addCase(noteDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(noteDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(
          (ele) => ele._id !== action.payload.note._id
        );
      })
      .addCase(noteDelete.rejected, (state) => {
        state.loading = false;
        state.notes = [];
      });
  },
});

export default noteReducer.reducer;
