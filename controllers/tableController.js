import db from "../config/db.js";

// 6. Profit penjualan bulanan tahun sebelumnya per produk
export const getMonthlyProfitByProduct = (req, res) => {
  const query = `
    SELECT product_name,

    SUM(CASE WHEN MONTH(o.order_date) = 1  THEN od.qty * od.price END) AS Januari,
    SUM(CASE WHEN MONTH(o.order_date) = 2  THEN od.qty * od.price END) AS Februari,
    SUM(CASE WHEN MONTH(o.order_date) = 3  THEN od.qty * od.price END) AS Maret,
    SUM(CASE WHEN MONTH(o.order_date) = 4  THEN od.qty * od.price END) AS April,
    SUM(CASE WHEN MONTH(o.order_date) = 5  THEN od.qty * od.price END) AS Mei,
    SUM(CASE WHEN MONTH(o.order_date) = 6  THEN od.qty * od.price END) AS Juni,
    SUM(CASE WHEN MONTH(o.order_date) = 7  THEN od.qty * od.price END) AS Juli,
    SUM(CASE WHEN MONTH(o.order_date) = 8  THEN od.qty * od.price END) AS Agustus,
    SUM(CASE WHEN MONTH(o.order_date) = 9  THEN od.qty * od.price END) AS September,
    SUM(CASE WHEN MONTH(o.order_date) = 10 THEN od.qty * od.price END) AS Oktober,
    SUM(CASE WHEN MONTH(o.order_date) = 11 THEN od.qty * od.price END) AS November,
    SUM(CASE WHEN MONTH(o.order_date) = 12 THEN od.qty * od.price END) AS Desember

    FROM orders o
    INNER JOIN order_details od ON o.order_id = od.order_id
    INNER JOIN products p ON od.product_id = p.product_id
    INNER JOIN product_categories pc ON p.category_id = pc.category_id
    WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
    GROUP BY p.product_id, p.product_name
    ORDER BY p.product_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

// 7. Penjualan bulanan tahun sebelumnya per produk
export const getMonthlySalesByProduct = (req, res) => {
  const query = `
    SELECT product_name,

    SUM(CASE WHEN MONTH(o.order_date) = 1  THEN od.qty END) AS Januari,
    SUM(CASE WHEN MONTH(o.order_date) = 2  THEN od.qty END) AS Februari,
    SUM(CASE WHEN MONTH(o.order_date) = 3  THEN od.qty END) AS Maret,
    SUM(CASE WHEN MONTH(o.order_date) = 4  THEN od.qty END) AS April,
    SUM(CASE WHEN MONTH(o.order_date) = 5  THEN od.qty END) AS Mei,
    SUM(CASE WHEN MONTH(o.order_date) = 6  THEN od.qty END) AS Juni,
    SUM(CASE WHEN MONTH(o.order_date) = 7  THEN od.qty END) AS Juli,
    SUM(CASE WHEN MONTH(o.order_date) = 8  THEN od.qty END) AS Agustus,
    SUM(CASE WHEN MONTH(o.order_date) = 9  THEN od.qty END) AS September,
    SUM(CASE WHEN MONTH(o.order_date) = 10 THEN od.qty END) AS Oktober,
    SUM(CASE WHEN MONTH(o.order_date) = 11 THEN od.qty END) AS November,
    SUM(CASE WHEN MONTH(o.order_date) = 12 THEN od.qty END) AS Desember,
    SUM(od.qty) AS Total_Tahunan

    FROM orders o
    INNER JOIN order_details od ON o.order_id = od.order_id
    INNER JOIN products p ON od.product_id = p.product_id
    INNER JOIN product_categories pc ON p.category_id = pc.category_id
    WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
    GROUP BY p.product_id, p.product_name
    ORDER BY p.product_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

// 8. Jumlah order bulanan tahun sebelumnya per customer
export const getMonthlyOrdersByCustomer = (req, res) => {
  const query = `
    SELECT 
    c.CUST_NAME AS customer_name,

    SUM(CASE WHEN MONTH(o.order_date) = 1  THEN 1 ELSE 0 END) AS Januari,
    SUM(CASE WHEN MONTH(o.order_date) = 2  THEN 1 ELSE 0 END) AS Februari,
    SUM(CASE WHEN MONTH(o.order_date) = 3  THEN 1 ELSE 0 END) AS Maret,
    SUM(CASE WHEN MONTH(o.order_date) = 4  THEN 1 ELSE 0 END) AS April,
    SUM(CASE WHEN MONTH(o.order_date) = 5  THEN 1 ELSE 0 END) AS Mei,
    SUM(CASE WHEN MONTH(o.order_date) = 6  THEN 1 ELSE 0 END) AS Juni,
    SUM(CASE WHEN MONTH(o.order_date) = 7  THEN 1 ELSE 0 END) AS Juli,
    SUM(CASE WHEN MONTH(o.order_date) = 8  THEN 1 ELSE 0 END) AS Agustus,
    SUM(CASE WHEN MONTH(o.order_date) = 9  THEN 1 ELSE 0 END) AS September,
    SUM(CASE WHEN MONTH(o.order_date) = 10 THEN 1 ELSE 0 END) AS Oktober,
    SUM(CASE WHEN MONTH(o.order_date) = 11 THEN 1 ELSE 0 END) AS November,
    SUM(CASE WHEN MONTH(o.order_date) = 12 THEN 1 ELSE 0 END) AS Desember,
    COUNT(o.order_id) AS Total_Tahunan

    FROM orders o
    INNER JOIN customers c ON o.cust_id = c.cust_id
    WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
    GROUP BY c.cust_id, c.CUST_NAME
    ORDER BY c.CUST_NAME;

  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

//  9. Total nominal order per customer pada tahun sebelumnya
export const getNominalOrderCustomerLastYear = (req, res) => {
  const query = `
    SELECT
        c.CUST_NAME,

        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 1  THEN o.TOTAL ELSE 0 END) AS Januari,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 2  THEN o.TOTAL ELSE 0 END) AS Februari,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 3  THEN o.TOTAL ELSE 0 END) AS Maret,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 4  THEN o.TOTAL ELSE 0 END) AS April,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 5  THEN o.TOTAL ELSE 0 END) AS Mei,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 6  THEN o.TOTAL ELSE 0 END) AS Juni,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 7  THEN o.TOTAL ELSE 0 END) AS Juli,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 8  THEN o.TOTAL ELSE 0 END) AS Agustus,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 9  THEN o.TOTAL ELSE 0 END) AS September,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 10 THEN o.TOTAL ELSE 0 END) AS Oktober,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 11 THEN o.TOTAL ELSE 0 END) AS November,
        SUM(CASE WHEN MONTH(o.ORDER_DATE) = 12 THEN o.TOTAL ELSE 0 END) AS Desember,
        
        SUM(o.TOTAL) AS Total_Tahunan

    FROM orders o
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY c.CUST_ID, c.CUST_NAME
    ORDER BY c.CUST_NAME
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// 10. Jumlah layanan bulanan oleh masing-masing kasir pada tahun sebelumnya
export const getMonthlyServiceLstYear = (req, res) => {
  const query = `
    SELECT c.USERNAME AS cashier_name,

    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 1  THEN 1 ELSE 0 END) AS Januari,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 2  THEN 1 ELSE 0 END) AS Februari,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 3  THEN 1 ELSE 0 END) AS Maret,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 4  THEN 1 ELSE 0 END) AS April,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 5  THEN 1 ELSE 0 END) AS Mei,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 6  THEN 1 ELSE 0 END) AS Juni,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 7  THEN 1 ELSE 0 END) AS Juli,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 8  THEN 1 ELSE 0 END) AS Agustus,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 9  THEN 1 ELSE 0 END) AS September,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 10 THEN 1 ELSE 0 END) AS Oktober,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 11 THEN 1 ELSE 0 END) AS November,
    SUM(CASE WHEN MONTH(o.ORDER_DATE) = 12 THEN 1 ELSE 0 END) AS Desember,
    COUNT(o.ORDER_ID) AS Total_Tahunan

    FROM orders o
    INNER JOIN cashiers c ON o.USER_ID = c.USER_ID
    WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY c.USER_ID, c.USERNAME
    ORDER BY c.USERNAME;

  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// Detail layanan yang dilayani kasir tertentu
export const getCashierServiceDetail = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      o.ORDER_ID,
      o.ORDER_DATE,
      p.PRODUCT_NAME,
      od.QTY,
      od.PRICE,
      (od.QTY * od.PRICE) AS SUBTOTAL
    FROM orders o
    INNER JOIN order_details od 
      ON o.ORDER_ID = od.ORDER_ID
    INNER JOIN products p 
      ON od.PRODUCT_ID = p.PRODUCT_ID
    WHERE o.USER_ID = ?
    ORDER BY o.ORDER_DATE DESC
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Tidak ada layanan untuk kasir ini" });
    }

    res.json(results);
  });
};
