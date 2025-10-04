const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*"}));


app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
app.use(express.static("public"));
