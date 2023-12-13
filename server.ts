import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db";
import fileRoutes from "./routes/files";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/files", fileRoutes)

connectDb();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`)); 
