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
        .then((conn) => {
            query(conn, "SELECT * FROM User_id WHERE user_id = ?", [
                req.body.username,
            ])
                .then((results) => {
                    if (results.length > 0) {
                        return results[0];
                    } else {
                        throw new Error("not registered");
                    }
                })
                .then((result) => {
                    if (
                        bcrypt.compareSync(req.body.password, result.password)
                    ) {
                        return result.user_id;
                    } else {
                        throw new Error("incorrect password");
                    }
                })
                .then(generateJWT)
                .then((token) => {
                    const expiration =
                        process.env.DB_ENV === "testing" ? 100 : 604800000;

                    res.cookie("token", token, {
                        secure:
                            process.env.NODE_ENV === "production"
                                ? true
                                : false,
                        httpOnly: false,
                    });

                    return res.sendStatus(200);
                })
                .catch((err) => {
                    res.status(404).json({
                        error: { message: err.message },
                    });
                });
            conn.end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.sendStatus(200);
};
