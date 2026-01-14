import db from "../config/db.js";

/**
 * 1. GET
 * Menampilkan kategori Makanan saja
 */
export const getcategorie = (req, res) => {
  db.query(
    "SELECT * FROM product_categories WHERE category_id = ? AND category = ?",
    ["MK", "Makanan"],
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
 * Menyimpan kategori Makanan
 * (category_id & category dikunci)
 */
export const savecategorie = (req, res) => {
  db.query(
    "INSERT INTO product_categories (category_id, category) VALUES (?, ?)",
    ["MK", "Makanan"],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Kategori Makanan berhasil disimpan" });
    }
  );
};

/**
 * 3. GET BY ID
 * Menampilkan kategori Makanan berdasarkan category_id
 */
export const showcategorieById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM product_categories WHERE category_id = ? AND category = ?",
    [id, "Makanan"],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Kategori Makanan tidak ditemukan" });
      }

      res.json(results[0]);
    }
  );
};

/**
 * 4. PUT
 * Update kategori Makanan (nama bisa diubah kalau mau)
 */
export const updatecategorieById = (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  db.query(
    "UPDATE product_categories SET category = ? WHERE category_id = ? AND category_id = 'MK'",
    [category, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Kategori Makanan berhasil diupdate" });
    }
  );
};

/**
 * 5. DELETE
 * Menghapus kategori Makanan berdasarkan ID
 */
export const deletecategorieById = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM product_categories WHERE category_id = ? AND category = ?",
    [id, "Makanan"],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Kategori Makanan berhasil dihapus" });
    }
  );
};
