const db = require('../database/client_database');
const {hash} = require('./conversion_functions');

exports.login = async (req, res) => {
  const result = await db.login(req.body.email, hash(req.body.password)); // TODO: change email to card number

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result.client_id) {
    res.status(401).json({message: 'Invalid username or password'}).end();
  } else {
    res.status(200).json(result).end();
  }
};
