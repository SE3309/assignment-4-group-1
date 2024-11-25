const {createHash} = require("crypto");

function hash(string) {
    const salt = process.env.SALT;
    return createHash('sha256').update(salt + string).digest('hex');
}

module.exports = {
    hash
};
