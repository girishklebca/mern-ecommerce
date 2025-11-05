import * as React from "react";
import Card from "@mui/material/Card";
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

  const [cartCounter, setCartCounter] = React.useState(0);

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
        gap: { xs: 2, sm: 2.5, md: 3 },
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: { xs: 8, sm: 10, md: 12 },
        background: "#7DD3FC",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 2, md: 0 },
          mb: { xs: 2, sm: 0 },
        }}
      >
        <Autocomplete
          disablePortal
          options={searchArray}
          sx={{
            width: { xs: "100%", sm: "100%", md: 600 },
            height: "100%",
            borderRadius: "5px",
            bgcolor: "white",
          }}
          value={searchQuery}
          onChange={(event, newValue) => {
            setSearchQuery(newValue);
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
          onClick={() => navigate("/product/create")}
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            py: { xs: 1.5, sm: 2 },
            px: { xs: 2, sm: 3 },
            width: { xs: "100%", sm: "auto" },
          }}
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
              height: { xs: 200, sm: 220, md: 240 },
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
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxWidth: { xs: 150, sm: 200, md: 250, lg: 300 },
                  height: { xs: 150, sm: 180, md: 200 },
                  objectFit: "contain",
                  objectPosition: "center",
                  backgroundColor: "#fff",
                  my: { xs: 2, sm: 5, md: 10 },
                  mx: { xs: 1, sm: 2 },
                }}
                image={item.img}
                alt={item.title}
              />
              {/* Best Sellers */}
              {item.company === "McLaren" && (
                <div className="absolute left-2 top-2 md:left-5 md:top-5">
                  <Chip label="Best Seller" color="primary" size="small" />
                </div>
              )}
              <div className="h-full w-full -mr-8 p-2 md:p-4 flex flex-col justify-center gap-1 md:gap-3 bg-gray-100">
                <div>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      width: "80%",
                      textAlign: "justify",
                      fontSize: { xs: "0.625rem", sm: "0.7rem", md: "0.75rem" },
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Magni, iure ipsam amet inventore dolorem neque quam pariatur
                    expedita optio veritatis harum quasi, repellendus
                    exercitationem at ad, ullam aperiam aliquam undo.
                  </Typography>
                </div>
                <div>
                  <Chip
                    label={item.company}
                    variant="filled"
                    sx={{
                      fontSize: { xs: "11px", sm: "12px", md: "14px" },
                      backgroundColor: "black",
                      color: "white",
                      height: { xs: 22, sm: 24, md: 28 },
                    }}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-sm md:text-lg font-bold">
                      ${item.newPrice}.00{" "}
                    </p>
                    <p className="line-through text-xs md:text-sm">
                      ${item.prevPrice}{" "}
                    </p>
                  </div>
                  <div className="flex gap-1 md:gap-2 md:mr-10">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#0284c7",
                        p: { xs: 0.75, sm: 1, md: 1.5 },
                        px: { xs: 1.5, sm: 2, md: 3 },
                        fontSize: {
                          xs: "0.625rem",
                          sm: "0.7rem",
                          md: "0.75rem",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#000",
                        p: { xs: 0.75, sm: 1, md: 1.5 },
                        fontSize: {
                          xs: "0.625rem",
                          sm: "0.7rem",
                          md: "0.75rem",
                        },
                        minWidth: { xs: "auto", sm: "auto" },
                      }}
                    >
                      <IoMdCart className="text-sm md:text-xl" />
                      <span className="hidden sm:inline">
                        &nbsp; Add to Cart
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="absolute top-2 right-2 md:top-5 md:right-5 text-base md:text-xl cursor-pointer">
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              height: "90vh",
              bgcolor: "background.paper",
              outline: "none",
              overflow: "hidden",
              zIndex: 1300,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            {selectedProduct && (
              <>
                {/* Close Button */}
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    position: "absolute",
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
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {/* Product Image Section */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2, sm: 3, md: 4 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        maxWidth: "90%",
                        maxHeight: "80%",
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
                      p: { xs: 2, sm: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
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

                    {/* Company Badge */}
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={selectedProduct.company}
                        variant="filled"
                        sx={{
                          fontSize: "16px",
                          backgroundColor: "black",
                          color: "white",
                          height: 36,
                        }}
                      />
                      <Box sx={{ mr: "10px" }}>
                        <HiDotsVertical className="text-[24px]" />
                      </Box>
                    </Box>

                    {/* Product Description */}
                    <Typography
                      variant="body1"
                      sx={{
                        mb: { xs: 2, sm: 2.5, md: 3 },
                        color: "text.secondary",
                        lineHeight: 1.2,
                        fontSize: { xs: "0.5rem", sm: "0.95rem", md: "0.5" },
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
                        <Box
                          sx={{
                            mb: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Customer Rating:
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
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
                      </Box>
                    </Box>

                    {/* Customer Rating */}

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
                      {cartCounter == 0 && (
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
                          onClick={() => setCartCounter(1)}
                        >
                          Add to Cart
                        </Button>
                      )}
                      {cartCounter > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => setCartCounter(cartCounter - 1)}
                            sx={{
                              borderRadius: "50%",
                              minWidth: "50px",
                              width: "50px",
                              height: "50px",
                              padding: 0,
                            }}
                          >
                            -
                          </Button>
                          <Typography variant="h5" sx={{ mx: "30px" }}>
                            {cartCounter}{" "}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => setCartCounter(cartCounter + 1)}
                            sx={{
                              borderRadius: "50%",
                              minWidth: "50px",
                              width: "50px",
                              height: "50px",
                              padding: 0,
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      )}
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
