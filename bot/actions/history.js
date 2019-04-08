const { RichEmbed } = require('discord.js')
const esClient = require('../../elasticsearch')

// cached client
let _client = undefined

// const SERVICE_URL = 'http://kitchu.lazecrew.com:9000'
const SERVICE_URL = 'http://localhost:9000/api/history'

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

    let userId = message.author.id
    let opponentId = mentionedUser.id

    // check both id registered
    Promise.all([userId, opponentId].map(esClient.user.existUser))
    .then(exists => {
        // if the requester is not identified
        if (!exists[0]) {
            message.author.send('전적 기록 요청 전 먼저 등록을 해주세요! `/register`')
        } else if (!exists[1]) {
            message.author.send(`[${mentionedUser.username}] 님은 아직 등록되지 않았습니다.\n관리자에게 문의해주세요!`)
        } else {
            console.log(`\tRecieving stat register request with mentioned: ${userId} -> ${opponentId}`)

            message.author.send(new RichEmbed()
                .setTitle('배틀리포트 등록 안내')
                .setDescription(`배틀리포트 안내를 도와드리겠습니다.\n[이 링크](${SERVICE_URL}/register/${userId}/${opponentId})를 클릭하여 상세내용을 입력해주세요.`))
        }
    })
}

/**
 * 전적 기록 요청을 완료한 유저에게 등록 완료를 안내
 */
let handleRequestRegistered = data => {
    Promise.all([data.requesterId, data.opponentId].map(esClient.user.getUser))
    .then(users => {
        let historyId = new Date().getTime()

        let requester = users[0]
        let opponent = users[1]

        data.requester.id = requester.id
        data.requester.name = requester.name
        data.opponent.id = opponent.id
        data.opponent.name = opponent.name

        let history = {
            id: historyId,
            requester_id: requester.id,
            requester_name: requester.name,
            status: '0',
            users: [data.requester, data.opponent],
            inserted: historyId
        }

        esClient.history.indexHistory(history)
        .then(created => {
            if (created) {
                // 전적 기록 요청자에게 기록 요청에 성공했음을 안내
                _client.fetchUser(data.requesterId)
                .then(user => {
                    user.send(new RichEmbed()
                        .setTitle('전적 등록 요청 성공')
                        .setDescription(`${opponent.name}님에 대한 전적 등록 요청이 성공적으로 이루어졌습니다.\n${opponent.name}님의 승인 후 반영되며, 반영시 별도로 알려드릴게요!`))
                })

                // 전적 기록 대상자에게 기록 요청이 등록되었음을 안내
                _client.fetchUser(data.opponentId)
                .then(user => {
                    // TODO provide detailed information about requested history
                    user.send(new RichEmbed()
                        .setTitle('전적 등록 요청 도착')
                        .setDescription(`${opponent.name}님에 대한 전적 등록 요청이 성공적으로 이루어졌습니다.\n${opponent.name}님의 승인 후 반영되며, 반영시 별도로 알려드릴게요!`))
                })
            } else {
                // 전적 기록 요청자에게 기록 요청에 실패했음을 안내
                _client.fetchUser(data.requesterId)
                .then(user => {
                    user.send('사용자 등록에 실패했습니다. 관리자에게 문의해주세요!')
                })
            }
        })
    })
}

/**
 * 전적 기록 요청을 수신한 유저가 등록을 승인
 */
let handleRequestAccepted = function () {

}

/**
 * 전적 기록 요청을 수신한 유저가 등록을 거절
 */
let handleRequestDenied = function () {
    
}

module.exports = {
    bind: client => {
        // client caching
        _client = client

        client.on('message', handleRequest)
    },
    handleRequestRegistered,
    handleRequestAccepted,
    handleRequestDenied
}
