import 'dotenv/config'
import express from "express";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.mjs"
import loginRoutes from "./routes/loginRoutes.mjs"

const app = express(); //Middleware - parse json bodies from the req

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} 🚀`)
})