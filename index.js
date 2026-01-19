import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import categoriesRoute from './routes/categoriesRoute.js';
import productsRoute from './routes/productsRoute.js';
import customersRoute from './routes/customersRoute.js';
import ordersRoute from './routes/ordersRoute.js';
import transactionsRoute from './routes/transactionsRoute.js';
import tableRoute from './routes/tableRoute.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", categoriesRoute);
app.use("/api", productsRoute);
app.use("/api", customersRoute);
app.use("/api", ordersRoute);
app.use("/api", transactionsRoute);
app.use("/api", tableRoute);


app.listen(process.env.port, () => {
    console.log(`Server berjalan di http://localhost:${process.env.port}`);
});