require("dotenv").config(); 

const express = require("express"); 
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

const app = express(); //Middleware - parse json bodies from the req

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/login", require("./routes/loginRoutes"));
// app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} 🚀`)
})