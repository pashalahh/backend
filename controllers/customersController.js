import db from "../config/db.js";

//  1. GET
//  Menampilkan data customers

export const getUser = (req, res) => {
  db.query(
    `SELECT 
        CUST_ID,
        CUST_NAME,
        ADDRESS,
        EMAIL,
        GENDER_ID
     FROM customers`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
};


// 2. Menyimpan data
// INSERT INTO customers (CUST_NAME, ADDRESS, EMAIL, GENDER) VALUES (?, ?, ?,?)
export const saveUser = (req, res) => {
  const { CUST_NAME, ADDRESS, EMAIL, GENDER_ID } = req.body;
  db.query(
    "INSERT INTO customers (CUST_NAME, ADDRESS, EMAIL, GENDER_ID) VALUES (?, ?, ?, ?)",
    [ CUST_NAME, ADDRESS, EMAIL, GENDER_ID],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil disimpan"});
    }
  );
};


//  3. GET BY ID / NAME
//   Menampilkan data customer berdasarkan ID atau Nama
export const showUserById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
        CUST_ID,
        CUST_NAME,
        ADDRESS,
        EMAIL,
        GENDER_ID
     FROM customers
     WHERE CUST_ID = ? OR CUST_NAME = ?`,
    [id, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.json(results[0]);
    }
  );
};


// 4. Mengupdate data berdasarkan id
// UPDATE users SET nama=?, email=?, password=? WHERE ID=?
export const updateUserById = (req, res) => {
  const { id } = req.params;
  const { CUST_NAME, ADDRESS, EMAIL, GENDER_ID } = req.body;
  db.query(
    "UPDATE customers SET CUST_NAME=?, ADDRESS=?, EMAIL=?, GENDER_ID=? WHERE CUST_ID=?",
    [CUST_NAME, ADDRESS, EMAIL, GENDER_ID, id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil diupdate"});
    }
  );
};

// 5. Menghapus data berdasarkan id
// DELETE FROM user WHERE id=?
export const deleteUserById = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM customers WHERE CUST_ID=? OR CUST_NAME=?",
    [id, id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil dihapus"});
    }
  );
};