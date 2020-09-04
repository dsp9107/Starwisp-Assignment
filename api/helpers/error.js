module.exports.positive = errMsg => {
    return { code: 200, msg: errMsg || "All Good" };
};

module.exports.incorrectCredentials = {
    code: 500,
    msg: "Incorrect Credentials"
};

module.exports.improperFormat = errMsg => {
    return {
        code: 400,
        msg: errMsg || "Improper Format"
    };
};

module.exports.invalidUser = {
    code: 400,
    msg: "User Not Found"
};

module.exports.validUser = {
    code: 200,
    msg: "User Found"
};

module.exports.userAuthenticated = {
    code: 200,
    msg: "Authentication Successful"
};

module.exports.somethingBroke = {
    code: 500,
    msg: "Something Broke : Contact Your Administrator"
};

module.exports.notSufficientPermissions = {
    code: 401,
    msg: "Request Requires Elevation : Contact Your Administrator"
};

module.exports.userAlreadyExists = {
    code: 400,
    msg: "User Already Exists"
};