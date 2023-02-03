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
  const initialFormValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formInputs, setFormInputs] = useState(initialFormValues);
  const [photo, setPhoto]= useState()
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //console.log(isSignUp);
  console.log(formInputs);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const upLoadImage = (e) => {
    e.preventDefault();
    setPhoto({ ...photo, photo:e.target.files[0] });
  };

  const sendFormData = async (type ="signup") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      userName: formInputs.userName,
      email: formInputs.email,
      password: formInputs.password,
      imageFile: photo
    }).catch((err)=>console.log(err))

    const data = await res.data;
    console.log(data);
    return data;
  };

  const finalSubmit = (e) => {
    e.preventDefault();

    if (!isSignUp) {
      sendFormData("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => navigate("/chats"))
        .then((data) => console.log(data));
    } else {
      sendFormData().then((data) =>
        localStorage
          .setItem("userId", data.user.id)
          .then(() => navigate("/chats"))
          .then((data) => {
            console.log(data);
          })
      );
    }
  };

  return (
    <div>
      <form onSubmit={finalSubmit}>
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
              value={formInputs.userName}
              placeholder="Name"
              variant="outlined"
              margin="normal"
            />
          )}
          <TextField
            onChange={handleChange}
            name="email"
            value={formInputs.email}
            placeholder="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formInputs.password}
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
              value={formInputs.confirmPassword}
              type={"password"}
              placeholder="Confirm Password"
              variant="outlined"
              margin="normal"
            />
          )}
          {isSignUp && (
            <TextField
              onChange={upLoadImage}
              name="imageFile"
              value={formInputs.imageFile}
              type={"file"}
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
