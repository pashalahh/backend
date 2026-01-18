import db from "../config/db.js";

/**
 * 1. GET
 * Menampilkan semua produk Makanan (CATEGORY_ID = 'MK')
 */
export const getProductsMakanan = (req, res) => {
  db.query(
    "SELECT * FROM products ",
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
 * Menyimpan produk Makanan
 * CATEGORY_ID dikunci = 'MK'
 */
export const saveProductMakanan = (req, res) => {
  const { product_name, price, category_id, stock, created_by } = req.body;

  db.query(
    `INSERT INTO products 
     (PRODUCT_NAME, PRICE, CATEGORY_ID, STOCK, CREATED_AT, CREATED_BY)
     VALUES (?, ?, ?, ?, CURDATE(), ?)`,
    [product_name, price, category_id, stock, created_by],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Produk Makanan berhasil ditambahkan" });
    }
  );
};

/**
 * 3. GET BY ID
 * Menampilkan produk Makanan berdasarkan PRODUCT_ID
 */
export const showProductMakananById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM products WHERE PRODUCT_ID = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Produk Makanan tidak ditemukan" });
      }

      res.json(results[0]);
    }
  );
};

/**
 * 4. PUT
 * Update produk Makanan
 */
export const updateProductMakananById = (req, res) => {
  const { id } = req.params;
  const { product_name, price, category_id, stock, updated_by } = req.body;

  db.query(
    `UPDATE products 
     SET PRODUCT_NAME = ?, PRICE = ?, STOCK = ?, 
         UPDATED_AT = CURDATE(), UPDATED_BY = ?
     WHERE PRODUCT_ID = ?`,
    [product_name, price, category_id, stock, updated_by, id, ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Produk Makanan berhasil diupdate" });
    }
  );
};

/**
 * 5. DELETE
 * Menghapus produk Makanan
 */
export const deleteProductMakananById = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM products WHERE PRODUCT_ID = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Produk Makanan berhasil dihapus" });
    }
  );
};

// menampilkan produk berdasarkan CATEGORY_ID
export const getProductsByCategoryId = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
        PRODUCT_ID,
        PRODUCT_NAME,
        PRICE,
        CATEGORY_ID
     FROM products
     WHERE CATEGORY_ID = ?`,
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      res.json(results);
    }
  );
};
