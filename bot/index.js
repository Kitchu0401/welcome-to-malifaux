const discord = require('discord.js')
const client = new discord.Client()

const DISCORD_BOT_TOKEN = process.argv[2]

const bindFunctions = () => {
    require('./actions/log').bind(client)
    require('./actions/history').bind(client)
    require('./actions/info').bind(client)
    require('./actions/user').bind(client)
}

module.exports = {
    initialize: () => {
        console.log(`Trying to initialize bot with token: ${DISCORD_BOT_TOKEN}`)

        client.login(DISCORD_BOT_TOKEN)
            .then(bindFunctions)
            .catch(console.error)
    }
}
