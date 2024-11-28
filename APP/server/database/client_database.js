const {createClient} = require('./database_client');

async function getSalt(card_number) {
  try {
    const client = createClient();
    await client.connect();
    const res = await client.query(
      `SELECT salt
       FROM wob."user"
       JOIN wob.client ON wob."user".user_id = wob.client.user_id
       JOIN wob.bank_card ON wob.client.client_id = wob.bank_card.client_id
       WHERE card_number = $1`,
      [card_number]);
    await client.end();

    return res.rows.length === 1 ? res.rows[0].salt : '';
  } catch (e) {
    console.error(e);
  }
}

async function login(card_number, password) {
  try {
    const client = createClient();
    await client.connect();
    const res = await client.query(
      `SELECT "user".user_id  AS id, "user".name, "user".phone_number, "user".email,
              client.client_id, client.student_number,
              account.account_id, account.balance, account.status AS account_status,
              bank_card.expiry_date, bank_card.card_number, bank_card.status AS card_status, bank_card.daily_limit
       FROM wob."user"
       JOIN wob.client ON wob."user".user_id = wob.client.user_id
       LEFT JOIN wob.bank_card ON wob.client.client_id = wob.bank_card.client_id
       LEFT JOIN wob.account ON wob.bank_card.bank_card_id = wob.account.bank_card_id
       WHERE card_number = $1
         AND password = $2
         AND client.status = 'active'`,
        [card_number, password]);
    await client.end();

    return res.rows.length === 1 ? res.rows[0] : {};
  } catch (e) {
    console.error(e);
  }
}

async function create(new_client) {
  try {
    const address = new_client.address;
    const user = new_client.user;

    const client = createClient();
    await client.connect();
    const res = await client.query(
      `WITH address AS (
          INSERT INTO wob.address(street_number, street_name, city, province, postal_code)
          VALUES($1, $2, $3, $4, $5)
          RETURNING address_id
       ), "user" AS (
          INSERT INTO wob."user"(name, phone_number, email, date_of_birth, password, salt, address_id)
          VALUES($6, $7, $8, $9, $10, $11, (SELECT address_id FROM address))
          RETURNING user_id
       ), client AS (
          INSERT INTO wob.client (student_number, status, user_id)
          VALUES ($12, 'active', (SELECT user_id FROM "user"))
          RETURNING client_id
       ), bank_card AS (
          INSERT INTO wob.bank_card (client_id, expiry_date, card_number, pin, pin_salt, verification_value, verification_value_salt, status, daily_limit, card_type_id)
          VALUES ((SELECT client_id FROM client), NOW() + INTERVAL '5 years', $13, $14, $15, $16, $17, 'active', 200, (SELECT card_type_id FROM wob.card_type WHERE name = 'Debit'))
          RETURNING bank_card_id
       )
       INSERT INTO wob.account (bank_card_id, account_type_id, balance, status, branch_id)
       VALUES ((SELECT bank_card_id FROM bank_card), (SELECT account_type_id FROM wob.account_type WHERE name = 'Chequing'), 0, 'active', (SELECT branch_id FROM wob.branch LIMIT 1))
       RETURNING (SELECT bank_card_id FROM bank_card);`,
      [
        address.street_number, address.street_name, address.city, address.province, address.postal_code,
        user.name, user.phone_number, user.email, user.date_of_birth, user.password, user.salt,
        new_client.student_number,
        new_client.card_number, new_client.pin, new_client.pin_salt, new_client.verification_value, new_client.verification_value_salt
      ]
    );
    await client.end();

    return res.rows.length === 1 ? res.rows[0] : {};
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getSalt,
  login,
  create,
};
