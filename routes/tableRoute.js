import express from "express";
import { 
    getMonthlyProfitByProduct,
    getMonthlySalesByProduct,
    getMonthlyOrdersByCustomer,
    getNominalOrderCustomerLastYear,
    getMonthlyServiceLstYear,
    getCashierServiceDetail

 } from "../controllers/tableController.js";

const router = express.Router();


router.get("/profit-bulanan-produk", getMonthlyProfitByProduct);
router.get("/penjualan-bulanan-produk", getMonthlySalesByProduct);
router.get("/order-bulanan-customer", getMonthlyOrdersByCustomer);
router.get("/nominal-order-customer", getNominalOrderCustomerLastYear);
router.get("/layanan-bulanan-kasir", getMonthlyServiceLstYear);
router.get("/detail-layanan-kasir/:id", getCashierServiceDetail);

export default router;
