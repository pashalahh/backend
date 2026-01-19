import db from "../config/db.js";

// 1. GET
// Menampilkan kategori 
export const getcategorie = (req, res) => {
  db.query(
    "SELECT * FROM product_categories",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
};

// 2. POST
// Menyimpan kategori Makanan
export const savecategorie = (req, res) => {
  const { id, category } = req.body;
  db.query(
    "INSERT INTO product_categories (category_id, category) VALUES (?, ?)",
    [id, category],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Kategori berhasil disimpan" });
    }
  );
};

// 3. GET BY ID
// Menampilkan kategori Makanan berdasarkan category_id atau category
export const showcategorieById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM product_categories WHERE category_id = ? OR category = ?",
    [id, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
      }

      res.json(results[0]);
    }
  );
};

// 4. PUT
// Update kategori
export const updatecategorieById = (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  db.query(
    "UPDATE product_categories SET category = ? WHERE category_id = ?",
    [category, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Kategori berhasil diupdate" });
    }
  );
};

// 5. DELETE
// Menghapus kategori Makanan berdasarkan ID
export const deletecategorieById = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM product_categories WHERE category_id = ? OR category = ?",
    [id, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Kategori berhasil dihapus" });
    }
  );
};
