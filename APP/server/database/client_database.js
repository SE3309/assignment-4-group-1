const {createClient} = require('./database_client');

async function login(email, password) {
    try {
        const client = createClient();
        await client.connect();
        const res = await client.query(
            `SELECT "user".user_id AS id, "user".name, "user".phone_number, "user".email,
                    client.client_id, client.student_number
             FROM wob.user
             JOIN wob.client ON wob.user.user_id = wob.client.user_id
             WHERE email = $1
               AND password = $2
               AND status = 'active'`,
            [email, password]);
        await client.end();

        return res.rows.length === 1 ? res.rows[0] : null;
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    login
};
