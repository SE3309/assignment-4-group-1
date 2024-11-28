const db = require('../database/client_database');
const {hash} = require('./conversion_functions');

exports.login = async (req, res) => {
  const card_number = req.body.card_number;
  const salt = await db.getSalt(req.body.card_number);
  const password = hash(req.body.password, salt)[0];

  const result = await db.login(card_number, password);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (result.length === 0) {
    res.status(401).json({message: 'Invalid card number or password'}).end();
  } else {
    res.status(200).json({
      id: result[0].id,
      name: result[0].name,
      phone_number: result[0].phone_number,
      email: result[0].email,
      client_id: result[0].client_id,
      student_number: result[0].student_number,
      bank_card: {
        id: result[0].bank_card_id,
        type_id: result[0].card_type_id,
        type: result[0].card_type_name,
        expiry_date: result[0].expiry_date,
        number: result[0].card_number,
        status: result[0].card_status,
        daily_limit: result[0].daily_limit,
      },
      accounts: result.map(row => {
        return {
          id: row.account_id,
          type_id: row.account_type_id,
          type: row.account_type_name,
          balance: row.balance,
          status: row.account_status
        };
      })
    }).end();
  }
};

exports.create = async (req, res) => {
  const client = req.body;
  const card_number = Math.floor(Math.random() * 9000000000000000 + 1000000000000000).toString();
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
      id: result.bank_card_id, number: card_number,
    };

    res.status(201).json(client).end();
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const result = await db.getById(id);

  if (!result) {
    res.status(500).json({message: 'Internal server error'}).end();
  } else if (!result[0].client_id) {
    res.status(404).json({message: 'Client not found'}).end();
  } else {
    res.status(200).json({
      id: result[0].id,
      name: result[0].name,
      phone_number: result[0].phone_number,
      email: result[0].email,
      client_id: result[0].client_id,
      student_number: result[0].student_number,
      bank_cards: result.map(row => {
        return {
          id: row.bank_card_id,
          expiry_date: row.expiry_date,
          number: row.card_number,
          status: row.card_status,
          daily_limit: row.daily_limit,
          type_id: row.card_type_id,
          type: row.card_type_name,
        };
      }),
      accounts: result.map(row => {
        return {
          id: row.account_id,
          type_id: row.account_type_id,
          type: row.account_type_name,
          balance: row.balance,
          status: row.account_status,
          bank_card_id: row.bank_card_id,
        };
      })
    }).end();
  }
};
