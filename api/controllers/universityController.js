const dbConfig = require("../helpers/dbConfig");
const connection = require("../helpers/dbConn");
const query = require("../helpers/query");
const validator = require("../helpers/validator");

exports.fetchUniversities = (req, res, next) => {
    connection(dbConfig)
        .then((conn) => {
            query(conn, "SELECT * FROM Uni_details").then((results) => {
                if (results.length > 0) {
                    res.json({ results });
                } else {
                    res.status(404).json({
                        error: { message: "No Entries Found" },
                    });
                }
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

exports.addUniversity = (req, res, next) => {
    validator
        .pass(req.body)
        .then(() => connection(dbConfig))
        .then((conn) => {
            const q = `INSERT INTO Uni_details SET ?`;
            return query(conn, q, req.body);
        })
        .then((result) => {
            console.log(result);
            if (result.affectedRows == 1) {
                res.json({
                    result: {
                        message: "Addition Successful",
                        id: result.insertId,
                    },
                });
            }
            return conn.end();
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
    //Validate Input
    validator
        .pass(req.body)
        //Run Query
        .then(() => {
            const q = `UPDATE Uni_details SET ? WHERE uid = ${req.params.id}`;
            connection(dbConfig)
                .then((conn) => {
                    query(conn, q, req.body)
                        .then((result) => {
                            console.log(result);
                            if (result.affectedRows == 1) {
                                res.json({
                                    result: { message: "Updation Successful" },
                                });
                            } else {
                                res.status(404).json({
                                    result: { message: "No Entry Found" },
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
                    conn.end();
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
    //Validate Input
    validator
        .pass(req.body)
        //Run Query
        .then(() => {
            const q = `DELETE FROM Uni_details WHERE uid = ${req.params.id}`;
            connection(dbConfig)
                .then((conn) => {
                    query(conn, q)
                        .then((result) => {
                            console.log(result);
                            if (result.affectedRows == 1) {
                                res.json({
                                    result: { message: "Deletion Successful" },
                                });
                            } else {
                                res.status(404).json({
                                    result: { message: "No Entry Found" },
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
                    conn.end();
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
