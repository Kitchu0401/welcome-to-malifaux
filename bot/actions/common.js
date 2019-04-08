/**
 * 봇 액션 처리에서 공통으로 활용하는 유틸성 코드를 정리합니다.
 */

class BotActionRequest {
  constructor(message) {
    let splited = message.content.split(' ')

    this.message = message
    this.command = splited[0]
    this.parameter = splited.splice(1)
      .map(p => p.toLowerCase().trim())
      .filter(p => p.length >= 0)
  }

  reply(content) {
    this.message.channel.send(content)
  }
}

let mapRequest = (command, message, handler) => {
  let request = new BotActionRequest(message)

  try {
    if (request.command === command) handler(request)
  } catch (e) {
    request.reply('어라, 뭔가가 잘못됐는데..')
    console.error(e)
  }
}

module.exports = {
  BotActionRequest,
  mapRequest
}
