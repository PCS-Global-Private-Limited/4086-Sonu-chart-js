import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, category, price, quantitySold } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      quantitySold,
    });

    await newProduct.save();

    const allProducts = await Product.find().sort({ createdAt: -1 }); // newest first

    res.status(201).json({
      message: "Product added successfully",
      products: allProducts,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Fetched all products",
      products: products || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
