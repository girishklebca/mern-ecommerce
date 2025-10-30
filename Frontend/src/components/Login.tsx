import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  GitHub,
  Person,
  Email,
  Lock,
} from "@mui/icons-material";
import axios, { AxiosError } from "axios";

export default function Login2() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Get values from state (trim to remove spaces)
    const email = emailInput.trim();
    const password = passwordInput.trim();
    const username = usernameInput.trim();

    // Basic validation for Sign Up
    if (isSignUp && !username) {
      setErrorMessage("Please enter a username");
      setShowErrorAlert(true);
      return;
    }

    // Email validation only for Sign Up (not needed for Sign In)
    if (isSignUp && !email) {
      setErrorMessage("Please enter your email");
      setShowErrorAlert(true);
      return;
    }

    // Username validation only for Sign In (login uses username, not email)
    if (!isSignUp && !username) {
      setErrorMessage("Please enter your username");
      setShowErrorAlert(true);
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password");
      setShowErrorAlert(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setShowErrorAlert(true);
      return;
    }

    // // Email format validation (basic)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setErrorMessage("Please enter a valid email address");
    //   setShowErrorAlert(true);
    //   return;
    // }

    // Simulate successful sign in/sign up
    setShowSuccessAlert(true);

    // Auto-hide success alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
    // Reset alerts
    setShowSuccessAlert(false);
    setShowErrorAlert(false);

    // Handle Sign Up (Registration)
    if (isSignUp) {
      const dataToSend = { username, email, password };

      try {
        const res = await axios.post(
          "http://localhost:3000/api/register",
          dataToSend
        );
        console.log(`res= ${res}`);

        // Show success alert
        setShowSuccessAlert(true);

        // Clear inputs after successful registration
        setUsernameInput("");
        setEmailInput("");
        setPasswordInput("");

        console.log("Registration successful:", res.data);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error(
          "Registration error:",
          axiosError.response?.data || axiosError.message
        );
        setErrorMessage(
          axiosError.response?.data?.message || "Registration failed"
        );
        setShowErrorAlert(true);
      }
    } else {
      // Handle Sign In (Login)
      const loginData = { username, password };

      try {
        const res = await axios.post(
          "http://localhost:3000/api/login",
          loginData
        );

        if (res.data.success) {
          // Show success alert
          setShowSuccessAlert(true);

          // Clear inputs after successful login
          setUsernameInput("");
          setEmailInput("");
          setPasswordInput("");

          console.log("Login successful:", res.data);
        } else {
          setErrorMessage(res.data.message || "Login failed");
          setShowErrorAlert(true);
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error(
          "Login error:",
          axiosError.response?.data || axiosError.message
        );
        setErrorMessage(axiosError.response?.data?.message || "Login failed");
        setShowErrorAlert(true);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-20 p-2"
      style={{
        background: "#38BDF8",
        backgroundAttachment: "fixed",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: 500,
          maxHeight: "90vh",
          width: "100%",
          background: "#38BDF8",
          boxShadow: "0 25px 50px rgba(102, 126, 234, 0.3)",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: "#0284C7",
            color: "white",
            textAlign: "center",
            py: 2,
            px: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {isSignUp
              ? "Sign up to get started with your account"
              : "Sign in to continue to your account"}
          </Typography>
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            backgroundColor: "white",
            p: 3,
            overflowY: "auto",
          }}
        >
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Username Field (only for signup) */}
            {isSignUp && (
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#38BDF8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#38BDF8",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#38BDF8",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#38BDF8",
                  },
                }}
              />
            )}

            {/* Email Field */}
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#38BDF8" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#38BDF8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#38BDF8",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#38BDF8",
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              variant="outlined"
              helperText="Password must be at least 6 characters long"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#38BDF8" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#38BDF8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#38BDF8",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#38BDF8",
                },
              }}
            />

            {/* Remember Me & Forgot Password */}
            {!isSignUp && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: "#38BDF8",
                        "&.Mui-checked": {
                          color: "#38BDF8",
                        },
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Link
                  component="button"
                  variant="body2"
                  sx={{ color: "#38BDF8", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Box>
            )}

            {/* Main Action Button */}
            <Button
              fullWidth
              variant="contained"
              size="medium"
              onClick={handleSubmit}
              sx={{
                background: "#0284C7",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                margin: "auto",
                "&:hover": {
                  background: "#38BDF8",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                },
              }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1 }}>
              <Typography variant="body2" color="text.secondary">
                or continue with
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <Box className="flex gap-2 justify-center">
              <IconButton
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  p: 1.5,
                  "&:hover": {
                    borderColor: "#db4437",
                    backgroundColor: "#db4437",
                    color: "white",
                  },
                }}
              >
                <Google />
              </IconButton>
              <IconButton
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  p: 1.5,
                  "&:hover": {
                    borderColor: "#3b5998",
                    backgroundColor: "#3b5998",
                    color: "white",
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  p: 1.5,
                  "&:hover": {
                    borderColor: "#333",
                    backgroundColor: "#333",
                    color: "white",
                  },
                }}
              >
                <GitHub />
              </IconButton>
            </Box>

            {/* Toggle Login/Signup */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(!isSignUp);
                    // Reset alerts when switching forms
                    setShowSuccessAlert(false);
                    setShowErrorAlert(false);
                    setUsernameInput("");
                    setEmailInput("");
                    setPasswordInput("");
                  }}
                  sx={{
                    color: "#38BDF8",
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Link>
              </Typography>

              {/* Success Alert */}
              {showSuccessAlert && (
                <Alert
                  severity="success"
                  sx={{ mt: 2 }}
                  onClose={() => setShowSuccessAlert(false)}
                >
                  {isSignUp
                    ? "Account created successfully!"
                    : "Signed in successfully!"}
                </Alert>
              )}

              {/* Error Alert */}
              {showErrorAlert && (
                <Alert
                  severity="error"
                  sx={{ mt: 2 }}
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
