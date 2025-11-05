import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import {
  ShoppingCart,
  LocalShipping,
  Verified,
  Inventory,
  TrendingUp,
  Category,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCart sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: "#1976d2" }} />,
      title: "Easy Shopping",
      description: "Browse and purchase products with just a few clicks",
    },
    {
      icon: <LocalShipping sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: "#1976d2" }} />,
      title: "Fast Delivery",
      description: "Get your products delivered quickly and safely",
    },
    {
      icon: <Verified sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: "#1976d2" }} />,
      title: "Verified Products",
      description: "All products are quality checked and verified",
    },
    {
      icon: <Inventory sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: "#1976d2" }} />,
      title: "Wide Selection",
      description: "Choose from thousands of products across categories",
    },
  ];

  const stats = [
    { number: "10K+", label: "Products" },
    { number: "5K+", label: "Happy Customers" },
    { number: "50+", label: "Categories" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "#1976d2",
          color: "white",
          py: { xs: 6, sm: 8, md: 10 },
          textAlign: "center",
          minHeight: { xs: "300px", sm: "350px", md: "400px" },
          border: "white 5px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3.5rem" },
            }}
          >
            Welcome to Your E-Commerce Platform
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem", lg: "1.5rem" },
            }}
          >
            Discover amazing products, create your own listings, and grow your business
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "#667eea",
                "&:hover": { bgcolor: "#f5f5f5" },
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              onClick={() => navigate("/products")}
            >
              Browse Products
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#f5f5f5",
                  bgcolor: "rgba(255,255,255)",
                  color: "#000",
                },
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              onClick={() => navigate("/product/create")}
              startIcon={<Inventory />}
            >
              Create Product
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                textAlign: "center",
                py: { xs: 2, sm: 3 },
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-10px)" },
              }}
            >
              <Typography
                variant="h3"
                color="primary"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" } }}
              >
                {stat.number}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {stat.label}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#f5f5f5", py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            mb={{ xs: 3, sm: 4, md: 6 }}
            color="text.primary"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" } }}
          >
            Why Choose Us?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                elevation={2}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: { xs: 2, sm: 3 },
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box mb={2}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" } }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          mb={{ xs: 3, sm: 4, md: 6 }}
          color="text.primary"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" } }}
        >
          Popular Categories
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)",
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books", "Toys"].map(
            (category, index) => (
              <Card
                key={index}
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: "#1976d2",
                    color: "white",
                    transform: "translateY(-5px)",
                  },
                }}
                onClick={() => navigate("/products")}
              >
                <CardContent sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Category sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, mb: 1 }} />
                  <Typography
                    variant="body1"
                    fontWeight="500"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" } }}
                  >
                    {category}
                  </Typography>
                </CardContent>
              </Card>
            )
          )}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: "#1976d2",
          py: { xs: 4, sm: 6, md: 8 },
          textAlign: "center",
          color: "white",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" } }}
          >
            Ready to Start Selling?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 3, sm: 4 },
              opacity: 0.9,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            Create your product listing in minutes and reach thousands of customers
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#1976d2",
              "&:hover": { bgcolor: "#f5f5f5" },
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
            onClick={() => navigate("/product/create")}
            startIcon={<TrendingUp />}
          >
            Start Selling Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
