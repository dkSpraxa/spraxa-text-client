import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "../validation";
import { useDispatch } from "react-redux";
import { userSignup } from "../redux/userAction";
import Swal from "sweetalert2";

const Signup = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    co_password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    emailError: false,
    passwordError: false,
    passwordMatchError: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // onchange handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "name" && value.match(/[0-9]/)) {
      return; // Prevent input of numeric characters in the "name" field
    }
    setInputData({
      ...inputData,
      [name]: value,
    });

    if (name === "email") {
      setErrorMsg({
        ...errorMsg,
        emailError: !validateEmail(value),
      });
    }

    if (name === "password") {
      setErrorMsg({
        ...errorMsg,
        passwordError: !validatePassword(value),
      });
    }

    if (name === "co_password") {
      setErrorMsg({
        ...errorMsg,
        passwordMatchError: value !== inputData.password,
      });
    }
  };

  //submit handler
  const { name, email, password, co_password } = inputData;
  const { emailError, passwordError, passwordMatchError } = errorMsg;
  const signSubmit = () => {
    if (!name || !email || !password || !co_password) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Please provide all fields",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (
      validateEmail(email) &&
      validatePassword(password) &&
      password === co_password
    ) {
      dispatch(
        userSignup({ name, email: email.toLowerCase(), password, co_password })
      ).then((res) => {
        if (res.payload?.success) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Sign up Successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
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
    } else {
      return;
    }
  };

  return (
    <Box
      width={{ xs: "80%", md: "30%" }}
      margin="200px auto"
      boxShadow={4}
      padding={4}
      borderRadius={4}
    >
      <Typography
        variant="h1"
        component="div"
        fontSize={40}
        fontWeight={700}
        padding={2}
        borderBottom={1}
        display="inline-block"
        textTransform="uppercase"
      >
        Sign up
      </Typography>
      <Stack spacing={4} marginTop={4}>
        <TextField
          label="Full Name"
          name="name"
          value={name}
          onChange={onChangeHandler}
          required
        />
        <TextField
          label="Email Address"
          name="email"
          value={email}
          onChange={onChangeHandler}
          required
          error={emailError}
          helperText={emailError ? "Invalid email address" : ""}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
          required
          error={passwordError}
          helperText={
            passwordError
              ? "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character."
              : ""
          }
        />
        <TextField
          label="Confirm Password"
          name="co_password"
          type="password"
          value={co_password}
          onChange={onChangeHandler}
          required
          error={passwordMatchError}
          helperText={passwordMatchError ? "Passwords do not match" : ""}
        />
      </Stack>
      <Stack
        marginTop={4}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant={"contained"}
          sx={{ width: "30%" }}
          onClick={signSubmit}
        >
          Sign up
        </Button>
        <Link to="/">Have account? Login</Link>
      </Stack>
    </Box>
  );
};

export default Signup;
