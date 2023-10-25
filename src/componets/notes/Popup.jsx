import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { getAllNotes, noteDelete, noteUpdate } from "../redux/noteAction";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Q_mark from "../assets/Q_mark.png";

const MaxCharacterCount = 200;

//update box

export function UpdateBox({ editId, title, message }) {
  const [open, setOpen] = useState(false);
  const [noteData, setNoteData] = useState({
    title: title,
    message: message,
  });

  const dispatch = useDispatch();

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEditSubmit = () => {
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

    dispatch(noteUpdate({ editId, noteData }))
      .then((res) => {
        if (res.payload?.success) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Note updated!",
            showConfirmButton: false,
            timer: 2000,
          });
          dispatch(getAllNotes());
          setNoteData({
            ...noteData,
            title: "",
            message: "",
          });
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: `${res.error.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((err) => {
        console.log("somthing wrong");
      });
  };

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        <EditIcon sx={{ color: "blue" }} />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
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
              <Button
                style={{
                  width: "50px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#e5e5e5",
                  border: "none",
                }}
                onClick={onEditSubmit}
              >
                Update
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

//delete box

export function DeleteBox({ deleteId }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    dispatch(noteDelete({ deleteId }))
      .then((res) => {
        if (res.payload?.success) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Note Deleted!",
            showConfirmButton: false,
            timer: 2000,
          });
          dispatch(getAllNotes());
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: `${res.error.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((err) => {
        console.log("somthing wrong");
      });
  };

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        <DeleteForeverIcon sx={{ color: "red" }} />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={Q_mark}
            alt="?"
            width="200px"
            height="200px"
            style={{ margin: "auto" }}
          />
          <Typography
            color="red"
            variant="h5"
            fontWeight="700"
            textAlign="center"
          >
            Are you want to delete ?
          </Typography>
          <Stack direction="row" spacing={8} marginTop={4}>
            <Button color="error" onClick={deleteHandler} variant="contained">
              yes
            </Button>
            <Button color="success" onClick={handleClose} variant="contained">
              no
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
