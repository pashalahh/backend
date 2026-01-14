import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Perintah koneksi ke database
const db = mysql2.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
});

// Jalankan koneksi database
db.connect((err) => {
    // JIka ada eror
    if (err) {
        console.error('Error koneksi ke database', err);
        return;
    }

    // Jika berhasil
    console.log("MySQL Berhasil Connect!");
});

export default db;