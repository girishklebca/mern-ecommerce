import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  prevPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  company: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
});

const productModel = mongoose.model("Products", productSchema);

export { productModel };
