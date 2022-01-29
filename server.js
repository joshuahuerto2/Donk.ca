const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cookieParaer = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
//hehexd
//Load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const items = require("./routes/items");
const users = require("./routes/users");
const auth = require("./routes/auth");
const review = require("./routes/review");

//Connect to db
connectDB();

const app = express();

app.use(bodyParser.json());

//Cookie parser
app.use(cookieParaer());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// We need CORS for HTTP requests to work across servers.
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => res.status(200).send("Hello World"));

// File uploading
app.use(fileupload());

//Mount routes
app.use("/api/v1/items", items);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/review", review);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}.red`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
