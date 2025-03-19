const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authorization = require("./middleware/authorization");

// Routes
const jwtAuth = require("./routes/jwtAuth");
const profile = require("./routes/profile")

const app = express();

// Global middleware
app.use(cors()); // Allows resource sharing
app.use(express.json()); // Access to req.body on client side
app.use(cookieParser()); // Ensure cookies are parsed BEFORE authorization middleware
app.use(authorization);


app.use("/auth", jwtAuth)
app.use("/user", profile)


app.listen(3000, () => {
    console.log("Listening on port 3000")
})