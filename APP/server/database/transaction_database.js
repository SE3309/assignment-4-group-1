const {createClient} = require('./database_client');

async function transfer(accountId, destinationAccountId, amount) {
  const client = await createClient();
  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(`
        UPDATE wob.account
        SET balance = balance - $1
        WHERE account_id = $2`,
        [amount, accountId]
    );
    await client.query(`
        UPDATE wob.account
        SET balance = balance + $1
        WHERE account_id = $2`,
        [amount, destinationAccountId]
    );
    await client.query('COMMIT');
    return Promise.resolve();
  } catch (error) {
    await client.query('ROLLBACK');
    return Promise.reject(error);
  } finally {
    client.end();
  }
}

module.exports = {
  transfer
};