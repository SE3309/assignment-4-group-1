const {createClient} = require('./database_client');

async function test() {
    let result = '';

    try {
        const client = createClient();
        await (async () => {
            await client.connect();
            const res = await client.query('SELECT $1::text as message', ['Hello world!']);
            result = res.rows[0].message;
        })();
        await client.end();
    } catch (err) {
        console.error(err);
        return false;
    }

    return result;
}

module.exports = {
    test
};
