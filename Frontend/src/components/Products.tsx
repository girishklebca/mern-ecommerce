import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import data from "../data/data.ts";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Avatar,
  Box,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Rating,
  InputAdornment,
} from "@mui/material";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { IoMdCart, IoMdClose } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { FaHeart, FaShare } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Define the product type based on your data structure
type Product = {
  img: string;
  title: string;
  reviews: string;
  prevPrice: string;
  newPrice: string;
  company: string;
  color: string;
  category: string;
};

export default function ActionAreaCard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
  const [products, setProducts] = React.useState<Product[]>([]); // State for MongoDB products
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null); // State for search filter
  const [inputValue, setInputValue] = React.useState(""); // State for typed input

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Fetch products from MongoDB when component mounts
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/product/getProducts"
        );
        const result = await response.json();

        console.log("Fetched products:", result);

        // Assuming your backend returns { success: true, data: [...] }
        // Adjust based on your actual backend response structure
        if (result.success && result.data) {
          setProducts(result.data);
        } else if (Array.isArray(result)) {
          // If backend returns array directly
          setProducts(result);
        }
      } catch (error) {
        console.error("Error fetching products from MongoDB:", error);
        // Fallback to local data if fetch fails
        // setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array = run once on component mount

  // Use MongoDB products if loaded, otherwise use local data
  const displayProducts = products.length > 0 ? products : data;

  // Extract all product titles for search
  const searchArray = displayProducts.map((product) => product.title);

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? displayProducts.filter((product) => product.title === searchQuery)
    : displayProducts;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexWrap: "wrap",
        gap: 3, // Reduced from 5
        px: 8, // Reduced from 12
        py: 12, // Reduced from 15

        background: "#7DD3FC",
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Autocomplete
          disablePortal
          options={searchArray}
          sx={{ width: 600, bgcolor: "white" }}
          value={searchQuery}
          onChange={(event, newValue) => {
            setSearchQuery(newValue); // Update search query when user selects
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Products"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "action.active" }} />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        <Button
          variant="contained"
          // sx={{ marginLeft: "87%", padding: "20px" }}
          onClick={() => navigate("/product/create")}
        >
          <FaPlus /> &nbsp;Create Product{" "}
        </Button>
      </Box>
      {loading ? (
        <Typography
          variant="h6"
          sx={{ width: "100%", textAlign: "center", py: 10 }}
        >
          <CircularProgress />
        </Typography>
      ) : (
        filteredProducts.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: "100%",
              height: 240, // Reduced from 300
              display: "flex",
              flexDirection: "column",
              padding: 0,
              transition: "all 0.5s",
              cursor: "pointer",
              transformOrigin: "center center",

              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            variant="outlined"
            onClick={() => handleCardClick(item)}
          >
            <CardActionArea
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                // border: "2px solid red",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 240, // Reduced from 300
                  height: 160, // Reduced from 200
                  objectFit: "contain", // Shows full image without cropping
                  objectPosition: "center", // Centers the image
                  backgroundColor: "#fff",
                  mr: 16, // Reduced from 20
                  ml: 8, // Reduced from 10
                }}
                image={item.img}
                alt={item.title}
              />
              {/* Best Sellers */}
              {item.company === "Nike" && (
                <div className="absolute left-5 top-5">
                  <Chip label="Best Seller" color="primary" />
                </div>
              )}
              <div className="h-full w-full -mr-8 p-4 flex flex-col justify-center gap-3 bg-gray-100">
                <div>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      width: "80%",
                      textAlign: "justify",
                      fontSize: "0.75rem", // Smaller text
                    }}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Magni, iure ipsam amet inventore dolorem neque quam pariatur
                    expedita optio veritatis harum quasi, repellendus
                    exercitationem at ad, ullam aperiam aliquam unde.
                  </Typography>
                </div>
                <div>
                  <Chip
                    avatar={
                      <Avatar sx={{ height: "14px", width: "14px" }}>
                        {item.company.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    label={item.company}
                    variant="filled"
                    sx={{
                      fontSize: "14px", // Reduced from 18px
                      backgroundColor: "black",
                      color: "white",
                      height: 28, // Smaller chip
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-lg font-bold">${item.newPrice}.00 </p>
                    <p className="line-through text-sm">${item.prevPrice} </p>
                  </div>
                  <div className="mr-10">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#0284c7",
                        mr: 3,
                        p: 1.5,
                        px: 3,
                        fontSize: "0.75rem",
                      }}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#000",
                        p: 1.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      <IoMdCart className="text-xl" /> &nbsp; Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="absolute top-5 right-5 text-xl cursor-pointer">
                  <HiDotsVertical />
                </div>
              </div>
            </CardActionArea>
          </Card>
        ))
      )}

      {/* ======================================================  */}

      {/* Product Details Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "background.paper",
              p: 0,
              outline: "none",
              overflow: "auto",
              zIndex: 1300,
              transform: "scale(0.8)",
              transformOrigin: "center center",
            }}
          >
            {selectedProduct && (
              <>
                {/* Close Button */}
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    position: "fixed",
                    right: { xs: 16, sm: 20, md: 24 },
                    top: { xs: 16, sm: 20, md: 24 },
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    zIndex: 1301,
                    width: { xs: 40, sm: 44, md: 48 },
                    height: { xs: 40, sm: 44, md: 48 },
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <IoMdClose style={{ fontSize: "20px" }} />
                </IconButton>

                {/* Modal Content */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    minHeight: "100vh",
                    maxWidth: { xs: "100%", sm: 1200, lg: 1400, xl: 1600 },
                    margin: "0 auto",
                    pt: { xs: 6, sm: 4, md: 3 },
                    pb: { xs: 2, sm: 3, md: 4 },
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  {/* Product Image Section */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2, sm: 3, md: 4, lg: 5 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      minHeight: { xs: "40vh", sm: "50vh", lg: "100vh" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: { xs: 300, sm: 400, md: 500, lg: 550 },
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                      image={selectedProduct.img}
                      alt={selectedProduct.title}
                    />
                  </Box>

                  {/* Product Details Section */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2, sm: 3, md: 4, lg: 5 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      maxWidth: { xs: "100%", lg: 550, xl: 650 },
                      overflow: "auto",
                    }}
                  >
                    {/* Best Seller Badge */}
                    {selectedProduct.company === "Nike" && (
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label="Best Seller"
                          color="primary"
                          size="small"
                        />
                      </Box>
                    )}

                    {/* Product Title */}
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        mb: { xs: 1.5, sm: 2 },
                        fontWeight: "bold",
                        // border:"2px solid black",
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1.75rem",
                          md: "2rem",
                          lg: "2.125rem",
                        },
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedProduct.title}
                    </Typography>
                    <Box sx={{ position: "absolute", top: 115, right: 50 }}>
                      <HiDotsVertical className="text-[24px]" />
                    </Box>

                    {/* Company Badge */}
                    <Box sx={{ mb: 3 }}>
                      <Chip
                        avatar={
                          <Avatar sx={{ height: "24px", width: "24px" }}>
                            {selectedProduct.company.charAt(0).toUpperCase()}
                          </Avatar>
                        }
                        label={selectedProduct.company}
                        variant="filled"
                        sx={{
                          fontSize: "16px",
                          backgroundColor: "black",
                          color: "white",
                          height: 36,
                        }}
                      />
                    </Box>

                    {/* Product Description */}
                    <Typography
                      variant="body1"
                      sx={{
                        mb: { xs: 2, sm: 2.5, md: 3 },
                        color: "text.secondary",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni, iure ipsam amet inventore dolorem neque quam
                      pariatur expedita optio veritatis harum quasi, repellendus
                      exercitationem at ad, ullam aperiam aliquam unde. Sed ut
                      perspiciatis unde omnis iste natus error sit voluptatem.
                    </Typography>

                    {/* Product Details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Product Details
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Category:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {selectedProduct.category}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Color:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {selectedProduct.color}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Reviews:
                          </Typography>
                          <Typography variant="body2">
                            {selectedProduct.reviews
                              ? selectedProduct.reviews
                              : 123}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Customer Rating */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Customer Rating:
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Rating
                          value={4.5}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          (4.5/5)
                        </Typography>
                      </Box>
                    </Box>

                    {/* Price Section */}
                    <Box
                      sx={{
                        mb: { xs: 3, sm: 3.5, md: 4 },
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.5, sm: 2 },
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "bold",
                            color: "#0284c7",
                            fontSize: {
                              xs: "1.75rem",
                              sm: "2rem",
                              md: "2.125rem",
                            },
                          }}
                        >
                          ${selectedProduct.newPrice}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                            fontSize: {
                              xs: "1rem",
                              sm: "1.125rem",
                              md: "1.25rem",
                            },
                          }}
                        >
                          ${selectedProduct.prevPrice}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{ fontWeight: "medium" }}
                      >
                        You save $
                        {(
                          parseFloat(selectedProduct.prevPrice) -
                          parseFloat(selectedProduct.newPrice)
                        ).toFixed(2)}
                        !
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          right: 10,
                          top: 10,
                          display: "flex",
                          gap: 2,
                          fontSize: "24px",
                        }}
                      >
                        <FaHeart /> <FaShare />
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 1.5, sm: 2 },
                        mt: { xs: 2, sm: 0 },
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: "#0284c7",
                          py: { xs: 1.2, sm: 1.4, md: 1.5 },
                          fontSize: { xs: "14px", sm: "15px", md: "16px" },
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#0369a1",
                          },
                        }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<IoMdCart />}
                        sx={{
                          backgroundColor: "#000",
                          py: { xs: 1.2, sm: 1.4, md: 1.5 },
                          fontSize: { xs: "14px", sm: "15px", md: "16px" },
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#333",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
