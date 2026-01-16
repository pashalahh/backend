import express from "express";
import {
  getTransactions,
  getTransactionDetail
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionDetail);

export default router;