const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { setKey } = require('../../server/controllers/cloud.controller');

module.exports = {
    SendMessage: async function ({ user, message }) {
        const client = new TelegramClient(new StringSession(process.env.TELEGRAM_SESSION), process.env.TELEGRAM_API_ID, process.env.TELEGRAM_API_HASH, {
            connectionRetries: 5,
        });
        await client.connect();
        console.log(client.session.save());
        await client.sendMessage(user, { message: message });
        await client.disconnect();
    },
    Login: async function ({ phone }) {
        console.log(phone)
        const client = new TelegramClient(new StringSession(''), process.env.TELEGRAM_API_ID, process.env.TELEGRAM_API_HASH, {
            connectionRetries: 5,
        });
        await client.start({
            phoneNumber: phone,
            phoneCode: async () => await new Promise ((resolve, reject) => {
                global.socket.on('code', (data) => {
                    resolve(data);
                })
            }),
            onError: err => console.log(err),
        });
        setKey('TELEGRAM_SESSION', client.session.save());
        console.log(client.session.save());
        await client.disconnect();
    }
}