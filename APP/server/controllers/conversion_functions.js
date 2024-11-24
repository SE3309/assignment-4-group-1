const {createHash} = require("crypto");

async function hash(string) {
    const salt = process.env.SALT;
    return createHash('sha256').update(salt + string).digest('hex');
}

module.exports = {
    hash
};
