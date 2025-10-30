import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function BoxBasic() {
  return (
    <div className=" h-180  flex justify-end items-center border-2 bg-[url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  bg-cover ">
      <Box
        component="section"
        sx={{
          p: 2,
          border: 2,
          width: 800,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
          alignItems: "center",
          bgcolor: "rgba(255,255,255,0.9)", // Increase box opacity
          height: "100%",
          borderRadius: "150px",
        }}
        className="bg-[url(https://images.unsplash.com/photo-1497250681960-ef046c08a56e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-opacity-100 bg-cover"
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: 500 }}
          placeholder="Userame"
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ width: 500 }}
          placeholder="Email"
          color="secondary"
        />
        <TextField
          id="outlined-basic"
          label="Passwrod"
          variant="outlined"
          sx={{ width: 500 }}
          placeholder="Passwrod"
          type="password"
        />
        <div className="flex justify-center gap-10 w-full">
          <Button variant="contained" sx={{ paddingX: 5, paddingY: 2 }}>
            Login
          </Button>
          <Button variant="outlined" sx={{ paddingX: 5, paddingY: 2 }}>
            Sign Up?
          </Button>
        </div>
      </Box>
    </div>
  );
}
