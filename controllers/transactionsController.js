import db from "../config/db.js"; 

// 1. AMBIL SEMUA TRANSAKSI (Untuk Tabel Atas)
export const getTransactions = (req, res) => {
  const q = `
    SELECT 
      o.ORDER_ID, 
      o.ORDER_DATE, 
      o.TOTAL, 
      o.RECEIPT_NUMBER,
      c.CUST_NAME, 
      pm.METHOD as PAYMENT_METHOD
    FROM orders o
    LEFT JOIN customers c ON o.CUST_ID = c.CUST_ID
    LEFT JOIN payment_methods pm ON o.METHOD_ID = pm.METHOD_ID
    ORDER BY o.ORDER_DATE DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 2. AMBIL DETAIL ITEM BERDASARKAN ID (Untuk Tabel Bawah)
export const getTransactionDetail = (req, res) => {
  const { id } = req.params;

  const q = `
    SELECT 
      od.QUANTITY, 
      od.PRICE, 
      (od.QUANTITY * od.PRICE) as SUBTOTAL,
      p.PRODUCT_NAME
    FROM order_details od
    JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
    WHERE od.ORDER_ID = ?
  `;

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};