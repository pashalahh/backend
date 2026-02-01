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


// Detail siapa saja yang membeli produk terlaris pada tahun sebelumnya
export const getDetailProdukTerlaris = (req, res) => {
  const query = `
    SELECT DISTINCT
        c.CUST_ID,
        c.CUST_NAME,
        p.PRODUCT_NAME,
        SUM(od.QTY) AS total_dibeli
    FROM orders o
    INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
    INNER JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    WHERE od.PRODUCT_ID = (
        SELECT PRODUCT_ID
        FROM (
            SELECT 
                od.PRODUCT_ID,
                SUM(od.QTY) AS total_beli
            FROM orders o
            INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
            WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY od.PRODUCT_ID
            ORDER BY total_beli DESC
            LIMIT 1
        ) AS produk_terlaris
    )
    AND YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    GROUP BY c.CUST_ID, c.CUST_NAME, p.PRODUCT_NAME
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

// Detail order customer dengan jumlah order terbanyak tahun sebelumnya
export const getDetailOrderCustTerbanyak = (req, res) => {
  const query = `
    SELECT
        o.ORDER_ID,
        o.ORDER_DATE,
        o.TOTAL AS total_order,
        c.CUST_NAME,
        u.USERNAME AS kasir
    FROM orders o
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    INNER JOIN cashiers u ON o.USER_ID = u.USER_ID
    WHERE o.CUST_ID = (
        SELECT CUST_ID
        FROM (
            SELECT
                CUST_ID,
                COUNT(ORDER_ID) AS total_order
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY CUST_ID
            ORDER BY total_order DESC
            LIMIT 1
        ) AS cust_terbanyak_order
    )
    AND YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    ORDER BY o.ORDER_DATE
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


// Detail order customer dengan total belanja terbesar tahun sebelumnya
export const getDetailTotalBelanjaCustTerbanyak = (req, res) => {
  const query = `
    SELECT
        o.ORDER_ID,
        o.ORDER_DATE,
        c.CUST_NAME,
        p.PRODUCT_NAME,
        od.QTY,
        o.TOTAL AS total_order,
        u.USERNAME AS kasir
    FROM orders o
    INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
    INNER JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    INNER JOIN cashiers u ON o.USER_ID = u.USER_ID
    WHERE o.CUST_ID = (
        SELECT CUST_ID
        FROM (
            SELECT
                CUST_ID,
                SUM(TOTAL) AS total_belanja
            FROM orders
            WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY CUST_ID
            ORDER BY total_belanja DESC
            LIMIT 1
        ) AS cust_belanja_terbesar
    )
    AND YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    ORDER BY o.ORDER_DATE, o.ORDER_ID
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

// Detail item dan kasir untuk customer dengan jumlah item terbanyak tahun sebelumnya
export const getCustItemTerbanyak = (req, res) => {
  const query = `
    SELECT
        o.ORDER_ID,
        o.ORDER_DATE,
        c.CUST_NAME,
        p.PRODUCT_NAME,
        od.QTY,
        u.USERNAME AS kasir
    FROM orders o
    INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
    INNER JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
    INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
    INNER JOIN cashiers u ON o.USER_ID = u.USER_ID
    WHERE o.CUST_ID = (
        SELECT CUST_ID
        FROM (
            SELECT
                o.CUST_ID,
                SUM(od.QTY) AS total_item
            FROM orders o
            INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
            WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
            GROUP BY o.CUST_ID
            ORDER BY total_item DESC
            LIMIT 1
        ) AS cust_item_terbanyak
    )
    AND YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
    ORDER BY o.ORDER_DATE, o.ORDER_ID
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
