const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbConfig = require("../helpers/dbConfig");
const connection = require("../helpers/dbConn");
const query = require("../helpers/query");

const generateJWT = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
    });
    return token;
};

exports.login = (req, res, next) => {
    connection(dbConfig)
        .then((conn) =>
            query(conn, "SELECT * FROM User_id WHERE user_id = ?", [
                req.body.username,
            ])
        )
        .then((results) => {
            if (results.length > 0) {
                return results[0];
            } else {
                // throw new Error("user not registered");
                // never tell the client what the exact problem is to avoid assisting it to brute force it way in

                throw new Error("Incorrect Credentials");
            }
        })
        .then((result) => {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                return result.user_id;
            } else {
                // throw new Error("incorrect password");
                // never tell the client what the exact problem is to avoid assisting it to brute force it way in

                throw new Error("Incorrect Credentials");
            }
        })
        .then(generateJWT)
        .then((token) =>
            res
                .cookie("token", token, {
                    secure: process.env.DB_ENV === "production" ? true : false,
                    httpOnly: true,
                })
                .json({
                    success: {
                        message: "Logged In",
                        payload: token,
                    },
                })
        )
        .catch((err) => {
            console.log(err);
            res.status(404).json({ error: { message: err.message } });
        });
};

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    return res.json({
        success: {
            message: "Logged Out",
        },
    });
};
