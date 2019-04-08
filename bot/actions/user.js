const { RichEmbed } = require('discord.js')
const esClient = require('../../elasticsearch')

/**
 * [/register] 유저가 수동으로 등록을 요청하는 경우
 */
let handleMemberRegister = (message) => {
  if (!message.content.startsWith('/register')) return

  esClient.user.existUser(message.author.id)
  .then(exist => {
    if (exist) {
      message.author.send('이미 등록된 사용자입니다!')
    } else {
      esClient.user.indexUser(message.author)
      .then(created => {
        if (created) {
          message.author.send('성공적으로 등록되었습니다!')
        } else {
          message.author.send('사용자 등록에 실패했습니다. 관리자에게 문의해주세요!')
        }
      })
    }
  })
}

/**
 * [/show] 유저가 사용자 정보 조회를 요청하는 경우
 */
let handleMemberShow = (message) => {
  if (!message.content.startsWith('/show')) return
  
  let mentionedUser = message.mentions.users.first()
  let userId = !!mentionedUser ? mentionedUser.id : message.author.id

  console.log(`- on handleMemberShow with userId: ${userId} (${typeof userId})`)

  esClient.user.getUser(userId)
  .then(user => {
    console.log(`- after esClient.user.getUser:`, user)

    let content = new RichEmbed()
      
    content.setTitle(`User [${user.name}] Status`)
    content.addField('Win', user.status.win, true)
    content.addField('Lose', user.status.lose, true)
    content.addField('Winning Rate', `${user.status.rate_winning}%`, true)

    // get most recent 3 histories
    let recentHistory = user.history.sort().slice(0, 3)
    if (recentHistory.length <= 0) {
      content.addField('Recent Battle History', 'None')
    } else {
      recentHistory.forEach(history => {
        content.addField(`History vs ${history.opponent.name}: ${history.win ? 'Won' : 'Lost'}`)
        content.addField('Faction', history.faction, true)
        content.addField('Master', history.master, true)
        content.addField('Score', history.score, true)
      })
    }

    message.author.send(content)
  })
  .catch(console.error)
}

/**
 * 유저가 채널에 입장하면 자동으로 등록
 */
let handleMemberAdded = (member) => {
  esClient.user.indexUser(member.user)
}

module.exports = {
  bind: client => {
      client.on('message', handleMemberRegister)
      client.on('message', handleMemberShow)
      client.on('guildMemberAdd', handleMemberAdded)
  }
}
