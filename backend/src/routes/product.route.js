import { Router } from "express";
import { fetchProducts, addProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/add-product").post(addProduct);
router.route("/fetch-all-product").get(fetchProducts);

export default router;
