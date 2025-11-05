import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import axios, { AxiosError } from "axios";

const ProductForm = () => {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  // All form data in ONE state object
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    prevPrice: "",
    newPrice: "",
    color: "",
    category: "",
    img: "",
  });

  // All-in-one handleChange function for ALL text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check if ALL fields are filled
    const { title, company, prevPrice, newPrice, color, category, img } =
      formData;

    if (
      !title ||
      !company ||
      !prevPrice ||
      !newPrice ||
      !color ||
      !category ||
      !img
    ) {
      // Show ERROR message if any field is empty
      setAlertType("error");
      setAlertMessage("Please fill in all fields!");
      setOpen(true);
      return; // Stop execution, don't reset form
    }

    const dataToSend = {
      img,
      title,
      prevPrice,
      newPrice,
      company,
      color,
      category,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/product/create",
        dataToSend
      );

      console.log("Response:", res.data);

      // Get message from backend response
      const backendMessage =
        res.data?.message || "Product created successfully!";

      setAlertType("success");
      setAlertMessage(backendMessage); // Display backend message
      setOpen(true);

      // Reset ALL fields to empty strings
      setFormData({
        title: "",
        company: "",
        prevPrice: "",
        newPrice: "",
        color: "",
        category: "",
        img: "",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        "Creation error:",
        axiosError.response?.data || axiosError.message
      );

      // Get error message from backend
      const errorMessage =
        axiosError.response?.data?.message ||
        "❌ Error while creating a product";

      setAlertType("error");
      setAlertMessage(errorMessage); // Display backend error message
      setOpen(true);
    }
  };

  const textfieldStyling = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    // "& .MuiInputLabel-root": {
    //   color: "black",
    // },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#7DD3FC] p-4">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          minHeight: { xs: "auto", sm: "550px", md: "600px" },
          width: { xs: "100%", sm: "90%", md: "500px" },
          maxWidth: "500px",
          paddingTop: { xs: "15px", sm: "20px" },
          paddingX: { xs: "15px", sm: "20px" },
          paddingBottom: { xs: "15px", sm: "20px" },
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "5px",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            mb: { xs: 2, sm: 0 },
          }}
        >
          Create A New Product
        </Typography>

        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          placeholder="Enter the title"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleChange}
          sx={{
            ...textfieldStyling,
            mb: { xs: 2, sm: 0 },
          }}
        />
        <TextField
          id="outlined-basic"
          label="Company"
          variant="outlined"
          placeholder="Enter the company"
          fullWidth
          name="company"
          value={formData.company}
          onChange={handleChange}
          sx={{
            ...textfieldStyling,
            mb: { xs: 2, sm: 0 },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Prev Price"
            variant="outlined"
            placeholder="Enter the PrevPrice"
            name="prevPrice"
            value={formData.prevPrice}
            onChange={handleChange}
            sx={{
              ...textfieldStyling,
              width: { xs: "100%", sm: "48%" },
            }}
          />
          <TextField
            id="outlined-basic"
            label="New Price"
            variant="outlined"
            placeholder="Enter the New Price"
            name="newPrice"
            value={formData.newPrice}
            onChange={handleChange}
            sx={{
              ...textfieldStyling,
              width: { xs: "100%", sm: "48%" },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            placeholder="Enter the Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            sx={{
              ...textfieldStyling,
              width: { xs: "100%", sm: "48%" },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            placeholder="Enter the Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{
              ...textfieldStyling,
              width: { xs: "100%", sm: "48%" },
            }}
          />
        </Box>

        {/* Image URL Input - for pasting links from internet */}
        <TextField
          id="outlined-basic"
          label="Image URL"
          variant="outlined"
          placeholder="Paste image URL"
          fullWidth
          name="img"
          value={formData.img}
          onChange={handleChange}
          sx={{
            ...textfieldStyling,
            mb: { xs: 2, sm: 0 },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            paddingX: { xs: "30px", sm: "40px" },
            paddingY: { xs: "8px", sm: "10px" },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          Create Product
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertType} // "success" or "error"
          icon={alertType === "success" ? false : undefined} // Hide icon only for success
          sx={{
            width: "100%",
            bgcolor: alertType === "success" ? "black" : "#ffebee",
            color: alertType === "success" ? "white" : "#c62828",
            border: `2px solid ${
              alertType === "success" ? "black" : "#c62828"
            }`,
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductForm;
