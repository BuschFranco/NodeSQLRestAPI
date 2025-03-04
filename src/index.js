import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.listen(3000);
console.log("Server is running on port 3000");

app.use("/api",employeesRoutes);
app.use("/api",indexRoutes);