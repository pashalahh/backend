import express from 'express';
import dotenv from 'dotenv';
import categoriesRoute from './routes/categoriesRoute.js';
import productsRoute from './routes/productsRoute.js';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", categoriesRoute);
app.use("/api", productsRoute);


app.listen(process.env.port, () => {
    console.log(`Server berjalan di http://localhost:${process.env.port}`);
});