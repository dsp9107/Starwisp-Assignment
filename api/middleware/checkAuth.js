const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.cookies.token || "";
    try {
        if (!token) {
            return res
                .status(401)
                .json({ error: { message: "not logged in" } });
        }
        const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decrypt.id,
            firstname: decrypt.firstname,
        };
        next();
    } catch (err) {
        return res.status(500).json(err.toString());
    }
};
