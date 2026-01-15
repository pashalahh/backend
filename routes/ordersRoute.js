import express from "express";
import {
  getOrders,
  saveOrder,
  showOrderById,
  updateOrderById,
  deleteOrderById
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/orders", getOrders);
router.post("/orders", saveOrder);
router.get("/orders/:id", showOrderById);
router.put("/orders/:id", updateOrderById);
router.delete("/orders/:id", deleteOrderById);

export default router;
