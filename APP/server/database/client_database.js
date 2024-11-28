const {createClient} = require('./database_client');

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
       LEFT JOIN wob.account ON wob.account.client_id = wob.client.client_id
       LEFT JOIN wob.bank_card ON wob.bank_card.account_id = wob.account.account_id
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

module.exports = {
  login,
};
