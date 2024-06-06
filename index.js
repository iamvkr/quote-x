const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cookieParser = require('cookie-parser');
const {isVerified} = require("./routes/auth/verify.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());


app.get("/", require("./routes/home.js"));
app.get("/login", require("./routes/login.js"));
app.get("/dashboard",isVerified, require("./routes/dashboard.js"));
app.post("/auth/login", require("./routes/auth/login.js"));
app.post("/auth/signup", require("./routes/auth/signup.js"));
app.post("/auth/logout",isVerified, require("./routes/auth/logout.js"));
app.post("/quote/create",isVerified, require("./routes/quote/create.js"));
app.post("/quote/delete/:quoteId",isVerified, require("./routes/quote/delete.js"));

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})