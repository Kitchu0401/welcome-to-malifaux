const chalk = require('chalk')

// TEMP
const displayObject = object => {
    console.log(Object.keys(object).map(key => `${key}: ${object[key]}`))
}

const getTypeColor = (message, text) => {
    switch (message.channel.type) {
        case 'dm':      return chalk.red(text)
        case 'text':    return chalk.green(text)
        default:        return text
    }
}

const generateLog = message => {
    return `[${getTypeColor(message, message.channel.type)}][${message.id}] ${message.content} by ${message.author.username} (${message.author.id})`
}

module.exports = {
    bind: client => {
        client.on('message', message => {
            // displayObject(message)
            // displayObject(message.author)
            console.log(generateLog(message))
        })
    }
}
