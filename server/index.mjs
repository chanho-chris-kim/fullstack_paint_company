import 'dotenv/config'
import express from "express";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.mjs"
import loginRoutes from "./routes/loginRoutes.mjs"
import paintsRoutes from "./routes/paintsRoutes.mjs"
import deliveriesRoutes from "./routes/deliveriesRoutes.mjs"

const app = express(); //Middleware - parse json bodies from the req

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use('/api/paints', paintsRoutes);
app.use('/api/deliveries', deliveriesRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} 🚀`)
})