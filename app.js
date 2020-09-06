const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const dbConfig = require("./api/helpers/dbConfig");
const connection = require("./api/helpers/dbConn");

const userRoutes = require("./api/routes/users");
const universityRoutes = require("./api/routes/universities");

const port = process.env.PORT;
const app = express();

// Test DB Connection

connection(dbConfig)
    .then((conn) => {
        console.log("MySQL : GOOD");
        conn.end();
    })
    .catch((err) => {
        console.log("MySQL : BAD");
        console.log(err);
        process.exit(1);
    });

// Middleware

app.use((req, res, next) => {
    console.log(
        "Request Received: ",
        new Date().toLocaleString("en-US", {
            timeZone: "Asia/Calcutta",
        })
    );
    next();
});

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public/build"));

//Security

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

//Routes

app.use("/api/users", userRoutes);
app.use("/api/universities", universityRoutes);

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "build", "index.html"));
// });

//Error Handling

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

//Server Config

var server = app.listen(port, () => {
    console.log(`Listening At ${port} ...`);
});
