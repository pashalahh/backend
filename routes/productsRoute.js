import express from "express";
import {
  getProductsMakanan,
  saveProductMakanan,
  showProductMakananById,
  updateProductMakananById,
  deleteProductMakananById
} from "../controllers/productsController.js";

const router = express.Router();

// KHUSUS PRODUK MAKANAN
router.get("/products", getProductsMakanan);
router.post("/products", saveProductMakanan);
router.get("/products/:id", showProductMakananById);
router.put("/products/:id", updateProductMakananById);
router.delete("/products/:id", deleteProductMakananById);

export default router;
