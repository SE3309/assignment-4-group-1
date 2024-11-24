const {createClient} = require('./database_client');

async function login(email, password) {
    try {
        const client = createClient();
        await client.connect();
        const res = await client.query(
            `SELECT "user".user_id AS id, "user".name, "user".phone_number, "user".email,
                    staff.staff_id, staff.branch_id,
                    staff_role.staff_role_id, staff_role.name AS role
             FROM wob."user"
             JOIN wob.staff ON wob."user".user_id = wob.staff.user_id
             JOIN wob.staff_role ON wob.staff.staff_role_id = wob.staff_role.staff_role_id
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
