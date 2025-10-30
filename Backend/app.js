import express from "express";
import { connectDB } from "./config/database.js";
import { userRouter } from "./routes/userRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import { productRouter } from "./routes/productRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api", userRouter);
app.use("/product", productRouter);

connectDB();
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
