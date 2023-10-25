import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "../validation";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/userAction";
import Swal from "sweetalert2";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    emailError: false,
    passwordError: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
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
  };

  const { email, password } = loginData;
  const { emailError, passwordError } = errorMsg;
  const loginSubmit = () => {
    if (!email || !password) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Please provide all fields",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (validateEmail(email) && validatePassword(password)) {
      dispatch(userLogin({ email: email.toLowerCase(), password })).then(
        (res) => {
          if (res.payload?.success) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Login Successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/home");
          } else {
            Swal.fire({
              position: "top",
              icon: "error",
              title: `${res.error.message}`,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }
      );
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
        textAlign="center"
      >
        sign in
      </Typography>
      <Stack spacing={4} marginTop={4}>
        <TextField
          label="Email Address"
          name="email"
          value={email}
          required
          onChange={onChangeHandler}
          error={emailError}
          helperText={emailError ? "Invalid email address" : ""}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          required
          onChange={onChangeHandler}
          error={passwordError}
          helperText={
            passwordError
              ? "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character."
              : ""
          }
        />
      </Stack>
      <Stack
        direction="row"
        marginTop={4}
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={2}>
          <Button variant={"contained"} onClick={loginSubmit}>
            sign in
          </Button>
          <Link to="/signup">New User ? Signup</Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
