import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios, { AxiosError } from "axios";
const Formdata = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [toast, setToast] = useState(false);

  // Single handleChange function for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "updateUsername":
        setUpdateUsername(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataToSend = { username, password, updateUsername };
      const res = await axios.post(
        "http://localhost:3000/api/update",
        dataToSend
      );
      console.log("Update successful:", res.data);

      // Clear form after successful update
      setUsername("");
      setPassword("");
      setUpdateUsername("");
      setToast(true);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        "Update error:",
        axiosError.response?.data || axiosError.message
      );
    }
  };

  return (
    <div className="pt-50">
      <form action="" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="ToUpdateName"
          variant="outlined"
          name="updateUsername"
          value={updateUsername}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
        {toast == true ? (
          <Alert variant="filled" severity="success">
            Submitted Successfully
          </Alert>
        ) : (
          <Alert variant="filled" severity="error">
            Upadtion false Message
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Formdata;
