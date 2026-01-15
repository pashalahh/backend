import db from "../config/db.js";

/**
 * 1. GET
 * Menampilkan semua order + nama metode pembayaran
 */
export const getOrders = (req, res) => {
  db.query(
    `SELECT 
        o.ORDER_ID,
        o.ORDER_DATE,
        o.CUST_ID,
        o.USER_ID,
        o.TOTAL,
        pm.METHOD AS payment_method,
        o.BANK_TRANS,
        o.RECEIPT_NUMBER
     FROM orders o
     JOIN payment_methods pm ON o.METHOD_ID = pm.METHOD_ID`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
};

/**
 * 2. POST
 * Simpan order (tetap pakai METHOD_ID)
 */
export const saveOrder = (req, res) => {
  const {
    order_date,
    cust_id,
    user_id,
    total,
    method_id,
    bank_trans,
    receipt_number
  } = req.body;

  db.query(
    `INSERT INTO orders 
     (ORDER_DATE, CUST_ID, USER_ID, TOTAL, METHOD_ID, BANK_TRANS, RECEIPT_NUMBER)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [order_date, cust_id, user_id, total, method_id, bank_trans, receipt_number],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Order berhasil disimpan" });
    }
  );
};

/**
 * 3. GET BY ID
 * Detail order + nama metode pembayaran
 */
export const showOrderById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
        o.*,
        pm.METHOD AS payment_method
     FROM orders o
     JOIN payment_methods pm ON o.METHOD_ID = pm.METHOD_ID
     WHERE o.ORDER_ID = ?`,
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Order tidak ditemukan" });
      }

      res.json(results[0]);
    }
  );
};

/**
 * 4. PUT
 * Update order
 */
export const updateOrderById = (req, res) => {
  const { id } = req.params;
  const {
    total,
    method_id,
    bank_trans
  } = req.body;

  db.query(
    `UPDATE orders 
     SET TOTAL = ?, METHOD_ID = ?, BANK_TRANS = ?
     WHERE ORDER_ID = ?`,
    [total, method_id, bank_trans, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Order berhasil diupdate" });
    }
  );
};

/**
 * 5. DELETE
 * Hapus order
 */
export const deleteOrderById = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM orders WHERE ORDER_ID = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Order berhasil dihapus" });
    }
  );
};
