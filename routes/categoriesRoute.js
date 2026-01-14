import express from "express";
import {
  getcategorie,
  savecategorie,
  showcategorieById,
  updatecategorieById,
  deletecategorieById
} from "../controllers/categoriesController.js";

const router = express.Router();

// KHUSUS KATEGORI MAKANAN
router.get("/categories", getcategorie);
router.post("/categories", savecategorie);
router.get("/categories/:id", showcategorieById);
router.put("/categories/:id", updatecategorieById);
router.delete("/categories/:id", deletecategorieById);

export default router;
