const express = require("express")
const cors = require("cors");

const dotenv = require("dotenv")
const connectDB = require("./config")

const userRoutes = require("./routes/userRoutes")
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config()

const app = express()

app.use(cors());


// body parser for json req
app.use(express.json())

// connect mongo
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Expense Tracker ");
});


// try to use user routes
app.use("/api/users", userRoutes); 
app.use("/api/expenses", expenseRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});