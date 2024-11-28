const db = require('../database/client_database');
const {hash} = require('./conversion_functions');

exports.login = async (req, res) => {
  const card_number = req.body.card_number;
  const salt = await db.getSalt(req.body.card_number);
  const password = hash(req.body.password, salt)[0];

  const result = await db.login(card_number, password);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result.client_id) {
    res.status(401).json({message: 'Invalid card number or password'}).end();
  } else {
    res.status(200).json(result).end();
  }
};

exports.create = async (req, res) => {
  const client = req.body;
  const card_number = Math.floor(Math.random() * 9000000000000000 + 1000000000000000).toString()
  client.card_number = card_number;

  const hashed = hash(client.user.password);
  client.user.password = hashed[0];
  client.user.salt = hashed[1];

  const pin = '0000';
  const hashed2 = hash(pin);
  client.pin = hashed2[0];
  client.pin_salt = hashed2[1];

  const verification_value = (Math.random() * 900 + 100).toString();
  const hashed3 = hash(verification_value);
  client.verification_value = hashed3[0];
  client.verification_value_salt = hashed3[1];

  const result = await db.create(client);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result.bank_card_id) {
    res.status(400).json({message: 'Invalid input'}).end();
  } else {
    delete client.card_number;
    delete client.user.password;
    delete client.user.salt;
    delete client.pin_salt;
    delete client.verification_value_salt;

    client.pin = pin;
    client.verification_value = verification_value;
    client.bank_card = {
      id: result.bank_card_id,
      number: card_number
    }

    res.status(201).json(client).end();
  }
};
