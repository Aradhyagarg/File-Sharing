import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db";
const app = express();
dotenv.config();
app.use(cors());

connectDb();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`)); 
