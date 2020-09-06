const dbConfig = require("../helpers/dbConfig");
const connection = require("../helpers/dbConn");
const query = require("../helpers/query");
const validator = require("../helpers/validator");

exports.fetchUniversities = (req, res, next) => {
    connection(dbConfig)
        .then((conn) => query(conn, "SELECT * FROM Uni_details"))
        .then((results) => {
            if (results.length > 0) {
                res.json({
                    success: {
                        message: "Entries Found",
                        payload: results,
                    },
                });
            } else {
                res.status(404).json({
                    error: { message: "No Entries Found" },
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    code: err.status,
                    message: err.message,
                },
            });
        });
};

exports.addUniversity = (req, res, next) => {
    validator
        .pass(req.body)
        .then(() => connection(dbConfig))
        .then((conn) => query(conn, `INSERT INTO Uni_details SET ?`, req.body))
        .then((result) => {
            if (result.affectedRows == 1) {
                res.json({
                    success: {
                        message: "Addition Successful",
                        payload: result.insertId,
                    },
                });
            } else {
                throw new Error("Something Went Wrong");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    code: err.status,
                    message: err.message,
                },
            });
        });
};

exports.updateUniversity = (req, res, next) => {
    validator
        .pass(req.body)
        .then(() => {
            const q = `UPDATE Uni_details SET ? WHERE uid = ${req.params.id}`;
            connection(dbConfig)
                .then((conn) => {
                    query(conn, q, req.body)
                        .then((result) => {
                            console.log(result);
                            if (result.affectedRows == 1) {
                                res.json({
                                    success: { message: "Updation Successful" },
                                });
                            } else {
                                res.status(404).json({
                                    error: {
                                        message: "No Entry Found",
                                    },
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).json({
                                error: {
                                    code: err.status,
                                    message: err.message,
                                },
                            });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                    });
                });
        })
        .catch((err) => {
            console.log({ err });
            res.status(err.code).json(err.msg);
        });
};

exports.deleteUniversity = (req, res, next) => {
    connection(dbConfig)
        .then((conn) =>
            query(conn, `DELETE FROM Uni_details WHERE uid = ${req.params.id}`)
        )
        .then((result) => {
            console.log(result);
            if (result.affectedRows == 1) {
                res.json({
                    success: { message: "Deletion Successful" },
                });
            } else {
                res.status(404).json({
                    error: {
                        message: "No Entry Found",
                    },
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: {
                    code: err.status,
                    message: err.message,
                },
            });
        });
};
