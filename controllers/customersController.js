import db from "../config/db.js";

/**
 * 1. GET
 * Menampilkan semua data customers
 */
export const getUser = (req, res) => {
  db.query(
    "SELECT * FROM customers", (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
};

// 2. Menyimpan data
// INSERT INTO users (nama, email, password) VALUES (?, ?, ?)
export const saveUser = (req, res) => {
  const { CUST_NAME, ADDRESS, EMAIL, GENDER } = req.body;
  db.query(
    "INSERT INTO customers (CUST_NAME, ADDRESS, EMAIL, GENDER) VALUES (?, ?, ?, ?)",
    [ CUST_NAME, ADDRESS, EMAIL, GENDER],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil disimpan"});
    }
  );
};

// 3. Menampilkan data berdasarkan id
// SELECT * FROM user WHERE ID=?
export const showUserById = (req, res) => {
  const { CUST_ID } = req.params;
  db.query(
    "SELECT * FROM customers WHERE CUST_ID = ?",
    [CUST_ID],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });
    
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

      res.json(results[0]);
    }
  );
};

// 4. Mengupdate data berdasarkan id
// UPDATE users SET nama=?, email=?, password=? WHERE ID=?
export const updateUserById = (req, res) => {
  const { CUST_ID } = req.params;
  const { CUST_NAME, ADDRESS, EMAIL, GENDER } = req.body;
  db.query(
    "UPDATE customers SET CUST_NAME=?, ADDRESS=?, EMAIL=? WHERE GENDER=?",
    [CUST_NAME, ADDRESS, EMAIL, GENDER, CUST_ID],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil diupdate"});
    }
  );
};

// 5. Menghapus data berdasarkan id
// DELETE FROM user WHERE id=?
export const deleteUserById = (req, res) => {
  const { CUST_ID } = req.params;
  db.query(
    "DELETE FROM customers WHERE CUST_ID=?",
    [CUST_ID],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil dihapus"});
    }
  );
};