import {
  Box,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createNote, getAllNotes } from "./redux/noteAction";
import { userLogout } from "./redux/userReducer";
import { useNavigate } from "react-router";
import NoteCard from "./notes/NoteCard";

const MaxCharacterCount = 200;

const Home = () => {
  const [noteData, setNoteData] = useState({
    title: "",
    message: "",
  });

  const [filterText, setFilterText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes, loading } = useSelector((state) => state.noteStore);

  const [filteredNotes, setFilteredNotes] = useState(notes);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      if (value.length <= MaxCharacterCount) {
        setNoteData({
          ...noteData,
          [name]: value,
        });
      }
    } else {
      setNoteData({
        ...noteData,
        [name]: value,
      });
    }
  };

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);

    if (text === "") {
      // If the search input is empty, display all notes
      setFilteredNotes(notes);
    } else {
      // Filter the notes based on the title
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  };

  const onSubmitHandler = () => {
    const { title, message } = noteData;

    if (!title || !message) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: `Please provide title and message both`,
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    dispatch(createNote({ noteData })).then((res) => {
      if (res.payload?.success) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Note created",
          showConfirmButton: false,
          timer: 2000,
        });
        dispatch(getAllNotes());
        setNoteData({ ...noteData, title: "", message: "" });
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: `${res.error.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  };

  //log out handler
  const logoutHandler = () => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Log out successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    dispatch(userLogout());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getAllNotes()).then((res) => {
      if (res.payload?.success) {
        setFilteredNotes(res.payload.notes);
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: `${res.error.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }, []);

  return (
    <Box
      bgcolor="#e5e5e5"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        width={{ xs: "100%", md: "60%" }}
        minHeight="10%"
        bgcolor="#261f47"
        marginBottom={10}
        borderRadius={{ xs: 2, md: 10 }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: "space-between", md: "space-around" }}
          width="100%"
          height="100%"
          paddingLeft={4}
          paddingRight={14}
        >
          <TextField
            variant="outlined"
            placeholder="Search notes"
            type="search"
            value={filterText}
            onChange={handleFilterChange}
            sx={{
              backgroundColor: "#3a3458",
              width:"50%",
              borderRadius: "20px",
              "& fieldset": { border: "none" },
            }}
            InputProps={{
              style: { color: "white", border: "none" },
              startAdornment: (
                <IconButton>
                  <SearchIcon sx={{ color: "white" }} />
                </IconButton>
              ),
            }}
          />
          <Button
            variant="outlined"
            color="info"
            onClick={logoutHandler}
            sx={{ marginRight: "6vmax" }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Box
        width={{ xs: "90%", md: "60%" }}
        minHeight="60%"
        bgcolor="#261f47"
        borderRadius={10}
        padding={4}
      >
        {loading ? (
          <Typography variant="h2">Loading...</Typography>
        ) : (
          <Box
            height="100%"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            sx={{ overflowY: "scroll" }}
          >
            <Box
              width={300}
              height={300}
              bgcolor="#56c1b6"
              borderRadius={2}
              textAlign="left"
              padding={2}
              margin={2}
            >
              <TextField
                placeholder="Title here..."
                variant="standard"
                name="title"
                value={noteData.title}
                onChange={onChangeHandler}
                sx={{
                  backgroundColor: "#56c1b6",
                  width: "100%",
                  height: "10%",
                  padding: "0px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  "& fieldset": { border: "none" },
                }}
              />
              <TextareaAutosize
                rowsMin={3}
                placeholder="Type here..."
                name="message"
                value={noteData.message}
                onChange={onChangeHandler}
                style={{
                  width: "100%",
                  height: "70%",
                  backgroundColor: "#56c1b6",
                  border: "none",
                  fontSize: "20px",
                  "&:focus": {
                    outline: "none", // Remove the outline when focused
                    border: "1px solid #ccc", // Customize the border style when focused
                  },
                }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body2"
                  color={
                    noteData.message.length > MaxCharacterCount
                      ? "error"
                      : "textSecondary"
                  }
                >
                  {noteData.message.length}/{MaxCharacterCount}
                </Typography>
                <button
                  style={{
                    width: "50px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#e5e5e5",
                    border: "none",
                  }}
                  onClick={onSubmitHandler}
                >
                  Add
                </button>
              </Stack>
            </Box>
            {filterText
              ? filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    message={note.message}
                    id={note._id}
                  />
                ))
              : notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    message={note.message}
                    id={note._id}
                  />
                ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
