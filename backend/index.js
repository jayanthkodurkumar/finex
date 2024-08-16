const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config")

const userRoutes = require("./routes/userRoutes")

dotenv.config()

const app = express()
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});