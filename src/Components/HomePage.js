import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [formInputs, setFormInputs] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageFile: null,
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //console.log(isSignUp);
  console.log(formInputs);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormInputs({ ...formInputs, [name]: files[0] });
    } else {
      setFormInputs({ ...formInputs, [name]: value });
    }
  };
  const sendFormData = async (type = "signin") => {
    console.log(type);
    try {
      const formData = new FormData();
      formData.append("userName", formInputs.userName);
      formData.append("email", formInputs.email);
      formData.append("password", formInputs.password);
      formData.append("imageFile", formInputs.imageFile);
  
      const res = await axios.post(
        `http://localhost:5000/api/user/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  
/*
  const sendFormData = async (type = "signin") => {
    console.log(type);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/${type}`,
        {
          userName: formInputs.userName,
          email: formInputs.email,
          password: formInputs.password,
          imageFile: formInputs.imageFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  */

  const finalSubmit = (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        sendFormData("signup")
          .then((data) => localStorage.setItem("userId", data.user._id))
          .then(() => navigate("/chats"))
          .catch((error) => {
            console.error(error);
          });
      } else {
        sendFormData()
          .then((data) => localStorage.setItem("userId", data.user._id))
          .then(() => navigate("/chats"))
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
/*
  const finalSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      sendFormData("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => navigate("/chats"))
        .then((data) => console.log(data));
    } else {
      sendFormData()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => navigate("/chats"))
        .then((data) => console.log(data));
    }
  };
  */

  return (
    <div>
      <form
        onSubmit={finalSubmit}
        enctype="multipart/form-data"
        action="/post"
        method="POST"
      >
        <Box
          display="flex"
          flexDirection={"column"}
          width="380px"
          justifyContent="center"
          alignContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            {!isSignUp ? "Login" : "Signup"}
          </Typography>
          {isSignUp && (
            <TextField
              onChange={handleChange}
              name="userName"
              placeholder="Name"
              variant="outlined"
              margin="normal"
            />
          )}
          <TextField
            onChange={handleChange}
            name="email"
            placeholder="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            variant="outlined"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isSignUp && (
            <TextField
              onChange={handleChange}
              name="confirmPassword"
              type={"password"}
              placeholder="Confirm Password"
              variant="outlined"
              margin="normal"
            />
          )}
          {isSignUp && (
            <TextField
              onChange={handleChange}
              name="imageFile"
              type={"file"}
              accept="image/*"
              margin="normal"
              borderRadius="6"
            />
          )}

          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="success"
          >
            {!isSignUp ? "Login" : "Signup"}
          </Button>
          <Button
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
            sx={{ marginTop: 1, borderRadius: 3 }}
          >
            Change To {isSignUp ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default HomePage;
