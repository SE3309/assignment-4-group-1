const db = require('../database/client_database');
const {hash} = require('./conversion_functions');

exports.login = async (req, res) => {
  const result = await db.login(req.body.card_number, hash(req.body.password));

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result.client_id) {
    res.status(401).json({message: 'Invalid username or password'}).end();
  } else {
    res.status(200).json(result).end();
  }
};

exports.create = async (req, res) => {
  const client = req.body;
  const hashed = hash(client.user.password);
  client.user.password = hashed[0];
  client.user.salt = hashed[1];

  const result = await db.create(client);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result.client_id) {
    res.status(400).json({message: 'Invalid input'}).end();
  } else {
    res.status(201).json(result).end();
  }
};
