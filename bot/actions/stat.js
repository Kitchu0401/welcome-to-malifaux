const { RichEmbed } = require('discord.js')
let _client = undefined

let ongoingRequests = {}

// TEMP
const displayObject = object => {
    console.log(Object.keys(object).map(key => `${key}: ${object[key]}`))
}

/**
 * 전적 기록을 요청하는 유저에게 등록 페이지 이동 링크 제공
 */
let handleRequest = message => {
    let mentionedUser = message.mentions.users.first()

    if (!message.content.startsWith('/report')) return
    if (!mentionedUser) {
        message.channel.send('리포트를 남길 상대방을 멘션으로 지정해야합니다. 예: `/report @Kitchu#9671`')
        return
    }

    console.log(`Recieving report request with mentiond: ${mentionedUser.id}`)
    // console.log(displayObject(message.mentions._client.Client))
    
    // cache ongoing report request
    ongoingRequests[message.author.id] = {
        message: message,
        opponent: mentionedUser.id
    }

    message.author.send(new RichEmbed()
        .setTitle('배틀리포트 등록 안내')
        .setDescription('배틀리포트 안내를 도와드리겠습니다.'))
}

/**
 * 전적 기록 요청을 완료한 유저에게 등록 완료를 안내
 */
let handleRequestRegistered = data => {
    
}

module.exports = {
    bind: client => {
        // client caching
        _client = client

        client.on('message', handleRequest)
    },
    handleRequestRegistered
}

// client.on('message', message => {
//     console.log(Object.keys(message).map(k => `${k}: ${message[k]}`))
//     console.log(message)
  
//     // If the message is "how to embed"
//     if (message.content === 'how to embed') {
//       // We can create embeds using the MessageEmbed constructor
//       // Read more about all that you can do with the constructor
//       // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
//       const embed = new discord.RichEmbed()
//         // Set the title of the field
//         .setTitle('A slick little embed')
//         // Set the color of the embed
//         .setColor(0xFF0000)
//         // Set the main content of the embed
//         .setDescription('Hello, this is a slick embed!');
//       // Send the embed to the same channel as the message
//       message.channel.send(embed);
//     }
//   })