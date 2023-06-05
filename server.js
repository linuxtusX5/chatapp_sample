import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./config/connectionDB.js";
import UserRoutes from './routes/UserRoutes.js'
import MessageRoutes from './routes/MessageRoutes.js'

dotenv.config();
DB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/messages', MessageRoutes);
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} Port ${PORT}`)
})