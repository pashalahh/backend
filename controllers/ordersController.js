import db from "../config/db.js";

// 1. Menampilkan produk terlaris dari tahun sebelumnya
export const getBestSellingProductLastYear = (req, res) => {
  const query = `
    SELECT PRODUCT_NAME, total_beli
FROM (
    SELECT 
        p.PRODUCT_NAME,
        SUM(od.QTY) AS total_beli
    FROM orders o
    INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
    INNER JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
    WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY p.PRODUCT_ID, p.PRODUCT_NAME
) AS subquery_produk
WHERE total_beli = (
    SELECT MAX(total_beli)
    FROM (
        SELECT 
            SUM(od.QTY) AS total_beli
        FROM orders o
        INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY od.PRODUCT_ID
    ) AS max_produk
);
`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
};


//  2. Customer yang paling banyak melakukan order pada tahun sebelumnya
export const getTopCustomersLastYear = (req, res) => {
  const query = `
    SELECT CUST_NAME, total_order
FROM (
    SELECT 
        c.CUST_NAME,
        COUNT(o.ORDER_ID) AS total_order
    FROM orders o
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY c.CUST_ID, c.CUST_NAME
) AS subquery_order
WHERE total_order = (
    SELECT MAX(total_order)
    FROM (
        SELECT 
            COUNT(ORDER_ID) AS total_order
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY CUST_ID
    ) AS max_order
);
`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(results);
  });
};

//  3. Customer dengan nilai order terbesar pada tahun sebelumnya
export const getTopOrderValueLastYear = (req, res) => {
  const query = `
    SELECT CUST_NAME, total_belanja
FROM (
    SELECT 
        c.CUST_NAME,
        SUM(o.TOTAL) AS total_belanja
    FROM orders o
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY c.CUST_ID, c.CUST_NAME
) AS subquery_belanja
WHERE total_belanja = (
    SELECT MAX(total_belanja)
    FROM (
        SELECT 
            SUM(TOTAL) AS total_belanja
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY CUST_ID
    ) AS max_belanja
);
`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(results);
  });
};

//  4. Customer dengan jumlah item produk terbanyak pada tahun sebelumnya
export const getTopItemBuyersLastYear = (req, res) => {
  const query = `
    SELECT CUST_NAME, total_item
FROM (
    SELECT 
        c.CUST_NAME,
        SUM(od.QTY) AS total_item
    FROM orders o
    INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY c.CUST_ID, c.CUST_NAME
) AS subquery_item
WHERE total_item = (
    SELECT MAX(total_item)
    FROM (
        SELECT 
            SUM(od.QTY) AS total_item
        FROM orders o
        INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY o.CUST_ID
    ) AS max_item
);
`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(results);
  });
};


//  5. 10 Produk terlaris pada tahun sebelumnya
export const getTop10BestSellingProductsLastYear = (req, res) => {
  const query = `
    SELECT PRODUCT_NAME, total_beli
    FROM (
        SELECT 
            p.PRODUCT_NAME,
            SUM(od.QTY) AS total_beli
        FROM orders o
        INNER JOIN order_details od 
            ON o.ORDER_ID = od.ORDER_ID
        INNER JOIN products p 
            ON od.PRODUCT_ID = p.PRODUCT_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY p.PRODUCT_ID, p.PRODUCT_NAME
        ORDER BY total_beli DESC
        LIMIT 10
    ) AS subquery_produk
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json(results);
  });
};
