import { Router } from "express";
import { fetchProducts, addProduct, getDashboardStats, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/add-product").post(addProduct);
router.route("/fetch-all-product").get(fetchProducts);
;
router.get('/products/stats', getDashboardStats);
// router.get('/products/:id', getProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
