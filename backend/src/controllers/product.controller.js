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

// Get single product
// export const getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, category, price, quantitySold } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name || product.name,
        category: category || product.category,
        price: price || product.price,
        quantitySold:
          quantitySold !== undefined ? quantitySold : product.quantitySold,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();

    const stats = {
      totalProducts: products.length,
      totalRevenue: products.reduce(
        (sum, product) => sum + product.price * product.quantitySold,
        0
      ),
      totalSold: products.reduce(
        (sum, product) => sum + product.quantitySold,
        0
      ),
      avgPrice:
        products.length > 0
          ? products.reduce((sum, product) => sum + product.price, 0) /
            products.length
          : 0,
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
