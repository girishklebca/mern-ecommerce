import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ActionAreaCard from "./Products";
import BoxBasic from "../xtraComponents/Login";
import Login2 from "./Login";
import { IoLogoVimeo } from "react-icons/io";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <TabContext value={value}>
      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          backgroundColor: "white",
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Changed from space-evenly
            padding: "10px 20px", // Added horizontal padding
            gap: 2, // Added gap between elements
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: 1,
              marginLeft: 10,
              cursor: "pointer", // Add cursor pointer to indicate it's clickable
            }}
            onClick={() => setValue("1")} // Set value to "1" to show Home tab
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  opacity: 0.8, // Add hover effect
                  transition: "opacity 0.2s ease",
                },
              }}
            >
              <p className="text-3xl text-purple-600">
                <IoLogoVimeo />
              </p>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#667eea",
                  letterSpacing: "0.5px",
                }}
              >
                Admino Ltd.
              </Typography>
            </Box>
          </Box>

          {/* Search Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              sx={{
                width: 300,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleSearch}
                      sx={{
                        color: "#667eea",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                        },
                      }}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Tabs Section */}
          <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Home" value="1" />
              <Tab label="About" value="2" />
              <Tab label="Contact Us" value="3" />
              <Tab label="options" value="4" />
              <Tab label="Learn More" value="5" />
            </TabList>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <ActionAreaCard />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <Login2 />
        </TabPanel>
        <TabPanel value="3">Contact Us</TabPanel>
        <TabPanel value="4">Options</TabPanel>
        <TabPanel value="5">Learn More</TabPanel>
      </Box>
    </TabContext>
  );
}
