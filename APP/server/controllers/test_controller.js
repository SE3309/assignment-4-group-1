const db = require("../database/test_database");

exports.test = async (req, res) => {
    const result = await db.test();

    if (!result) {
        res
            .status(500)
            .json({message: 'Internal server error.'})
            .end();
    } else {
        res
            .status(200)
            .json({message: result})
            .end();
    }
};
