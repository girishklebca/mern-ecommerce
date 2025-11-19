import express from "express";
import { productModel } from "../models/productModel.js";

const productRouter = express.Router();

// GET all products from MongoDB
productRouter.get("/getProducts", async (req, res) => {
  try {
    console.log("📥 Fetching all products from MongoDB...");

    // Fetch ALL products from database
    const allProducts = await productModel.find();

    console.log(`✅ Found ${allProducts.length} products`);

    res.status(200).json({
      success: true,
      count: allProducts.length,
      data: allProducts,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// {
//     "img":"https://www.wsupercars.com/wallpapers-regular/McLaren/2022-McLaren-765LT-Spider-010-1080.jpg,
//     "title":"2022 McLaren 765LT Spider-Green",
//     "prevPrice":"609",
//     "newPrice":"899",
//     "company":"McLaren",
//     "color":"Blue   ",
//     "category":"SuperCars"
// }
productRouter.post("/create", async (req, res) => {
  try {
    console.log("📥 Product creation request received:", req.body);
    const { img, title, prevPrice, newPrice, company, color, category } =
      req.body;

    if (
      !img ||
      !title ||
      !prevPrice ||
      !newPrice ||
      !company ||
      !color ||
      !category
    ) {
      console.log(`Enter details of all the fields`);
      return res.json({
        success: false,
        message: "❌ Enter all the details properly",
      });
    }

    const newTitle = title[0].toUpperCase() + title.slice(1);
    const newCompany = company[0].toUpperCase() + company.slice(1);
    const newColor = color[0].toUpperCase() + color.slice(1);
    const newCategory = category[0].toUpperCase() + category.slice(1);

    // const isExisting = await productModel.findOne({
    //   newTitle,
    //   newCompany,
    //   newColor,
    //   newCategory,
    // });

    // if (!isExisting) {
    //   console.log(`Product already Exists`);
    //   return res.json({ success: false, message: "Product already exists" });
    // }

    const newProduct = {
      img,
      title: newTitle,
      prevPrice,
      newPrice,
      company: newCompany,
      color: newColor,
      category: newCategory,
    };
    const savedProd = await productModel.create(newProduct);

    console.log(`Product saved to Database`, savedProd.title);
    console.log(`Product Details:`, {
      title: savedProd.title,
      company: savedProd.company,
      newPrice: savedProd.newPrice,
    });
    res.status(201).json({
      success: true,
      message: "✅ Product Created successfully",
      product: savedProd,
    });
  } catch (error) {
    console.error("❌ Product Creation error:", error);

    res.status(500).json({
      success: false,
      message: "Product Creation failed 🚫",
      error: error.message,
    });
  }
});

// {
//     "title":"2022 McLaren 765LT Spider",
//     "company":"McLaren",
//     "img":"https://www.wsupercars.com/wallpapers-regular/McLaren/2022-McLaren-765LT-Spider-010-1080.jpg",
//     "color":"Green",
//     "category":"HyperCars",
//     "newTitleName":"2022 McLaren 765LT Spider-Green",
//     "newCompanyName":"McLaren-Hypers"
// }

productRouter.post("/update", async (req, res) => {
  try {
    const {
      img,
      title,
      prevPrice,
      newPrice,
      company,
      color,
      category,
      newTitleName,
      newCompanyName,
    } = req.body;
    if (!title || !company) {
      console.log(`Title and company are required`);
      return res.status(400).json({
        success: false,
        message: "❌ Title and company are required",
      });
    }
    const checkTitle = title[0].toUpperCase() + title.slice(1);
    const checkCompany = company[0].toUpperCase() + company.slice(1);

    const toUpdateProd = await productModel.findOne({
      title: checkTitle,
      company: checkCompany,
    });

    toUpdateProd.img = img || toUpdateProd.img;
    toUpdateProd.prevPrice = prevPrice || toUpdateProd.prevPrice;
    toUpdateProd.newPrice = newPrice || toUpdateProd.newPrice;
    toUpdateProd.color = color || toUpdateProd.color;
    toUpdateProd.category = category || toUpdateProd.category;
    toUpdateProd.title = newTitleName || toUpdateProd.title;
    toUpdateProd.company = newCompanyName || toUpdateProd.company;

    const updatedProduct = await toUpdateProd.save();
    console.log(`Product Updated bro : `, updatedProduct);

    res.status(201).json({
      success: true,
      message: `✅ Product Updated Successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    console.log(`❌ Product Update Failed : ${error}`);
    res.status(501).json({
      success: false,
      message: "❌ Product Updating failed",
      error: error.message,
    });
  }
});

productRouter.delete("/delete", async (req, res) => {
  try {
    console.log(`📥 Product Deletion request received`);

    const { title, company } = req.body;

    if (!title || !company) {
      return res.status(400).json({
        success: false,
        message: "❌ Title and company are required",
      });
    }

    const checkTitle = title[0].toUpperCase() + title.slice(1);
    const checkCompany = company[0].toUpperCase() + company.slice(1);

    // Method 1: findOneAndDelete (recommended - one operation)
    const deletedProduct = await productModel.findOneAndDelete({
      title: checkTitle,
      company: checkCompany,
    });

    // Method 2: Alternative using deleteOne
    // const result = await productModel.deleteOne({
    //   title: checkTitle,
    //   company: checkCompany,
    // });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "❌ Product not found",
      });
    }

    console.log(`✅ Product deleted:`, deletedProduct.title);

    res.status(200).json({
      success: true,
      message: "✅ Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(`❌ Product Deletion Failed:`, error);
    res.status(500).json({
      success: false,
      message: "❌ Product deletion failed",
      error: error.message,
    });
  }
});

export { productRouter };
