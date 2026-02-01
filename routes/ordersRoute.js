import express from "express";
import {
  getBestSellingProductLastYear,
  getTopCustomersLastYear,
  getTopOrderValueLastYear,
  getTopItemBuyersLastYear,
  getTop10BestSellingProductsLastYear,
  getDetailProdukTerlaris,
  getDetailOrderCustTerbanyak,
  getDetailTotalBelanjaCustTerbanyak,
  getCustItemTerbanyak
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/orders/best-product/last-year", getBestSellingProductLastYear);
router.get("/orders/top-customers/last-year", getTopCustomersLastYear);
router.get("/orders/top-order-value/last-year", getTopOrderValueLastYear);
router.get("/orders/top-item-buyers/last-year", getTopItemBuyersLastYear);
router.get("/orders/top-10-products/last-year", getTop10BestSellingProductsLastYear);
router.get("/orders/best-product/last-year/details", getDetailProdukTerlaris);
router.get("/orders/top-customers/last-year/details", getDetailOrderCustTerbanyak);
router.get("/orders/top-order-value/last-year/details", getDetailTotalBelanjaCustTerbanyak);
router.get("/orders/top-item-buyers/last-year/details", getCustItemTerbanyak);

export default router;
