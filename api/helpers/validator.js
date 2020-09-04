const customJawaab = require("./error");

const patterns = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    uniname: /^[a-z]{0,20}$/i,
    registration_date: /^([0-9]{2}\/){2}[0-9]{4}$/,
    registration_date: /^([0-9]{2}\/){2}[0-9]{4}$/,
    contact_no: /^[0-9]{10}$/,
};

module.exports.pass = (params) => {
    return new Promise((resolve, reject) => {
        resolve(customJawaab.positive("ALL GOOD"));
    });
};

module.exports.smart = (params) => {
    // var funcs = [];
    // Object.keys(params).forEach((func) => {
    //     var choco = new Function(
    //         "func",
    //         "params",
    //         "patterns",
    //         "customJawaab",
    //         `
    //         return new Promise((resolve,reject) => {
    //         if (params.${func} && params.${func}.match(patterns.${func})) {
    //             resolve(customJawaab.positive("${func.toUpperCase()} Is In The Right Format"));
    //         } else {
    //             reject(customJawaab.improperFormat("Improper ${func.toUpperCase()} Format"));
    //         };});`
    //     );
    //     funcs.push(choco(func, params, patterns, customJawaab));
    // });
    // return new Promise((resolve, reject) => {
    //     Promise.all(funcs)
    //         .then((result) => {
    //             resolve(customJawaab.positive("ALL GOOD"));
    //         })
    //         .catch((err) => {
    //             console.log({ err });
    //             reject(err);
    //         });
    // });
};

module.exports.id = (id) => {
    return new Promise((resolve, reject) => {
        if (id && id.match(patterns.uid)) {
            resolve({
                code: customJawaab.positive().code,
                msg: { role: "student" },
            });
        } else if (id && id.match(patterns.eid)) {
            resolve({
                code: customJawaab.positive.code,
                msg: { role: "teacher" },
            });
        } else {
            reject(customJawaab.improperFormat("Improper ID Format"));
        }
    });
};

module.exports.email = (email) => {
    return new Promise((resolve, reject) => {
        if (email && email.match(emailRegEx)) {
            resolve(customJawaab.positive("EMAIL Is In The Right Format"));
        } else {
            reject(customJawaab.improperFormat("Improper EMAIL Format"));
        }
    });
};

module.exports.name = (name) => {
    return new Promise((resolve, reject) => {
        if (name && name.match(patterns.name)) {
            resolve(customJawaab.positive("NAME Is In The Right Format"));
        } else {
            reject(customJawaab.improperFormat("Improper NAME Format"));
        }
    });
};

module.exports.password = (pwd) => {
    return new Promise((resolve, reject) => {
        if (pwd && pwd.match(patterns.password)) {
            resolve(customJawaab.positive("PWD Is In The Right Format"));
        } else {
            reject(customJawaab.improperFormat("Improper PWD Format"));
        }
    });
};

module.exports.section = (section) => {
    return new Promise((resolve, reject) => {
        if (section && section.match(patterns.section)) {
            resolve(customJawaab.positive("SECTION Is In The Right Format"));
        } else {
            reject(customJawaab.improperFormat("Improper SECTION Format"));
        }
    });
};

module.exports.gender = (gender) => {
    return new Promise((resolve, reject) => {
        if (gender && gender.match(patterns.gender)) {
            resolve(customJawaab.positive("GENDER Is In The Right Format"));
        } else {
            reject(customJawaab.improperFormat("Improper GENDER Format"));
        }
    });
};

module.exports.dob = (dob) => {
    return new Promise((resolve, reject) => {
        if (dob && dob.match(patterns.dob)) {
            resolve(customJawaab.positive("GENDER Is In The Right Format"));
        } else {
            reject(customJawaab.improperFormat("Improper GENDER Format"));
        }
    });
};
