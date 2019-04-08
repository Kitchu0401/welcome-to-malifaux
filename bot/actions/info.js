const { RichEmbed } = require('discord.js')
const common = require('./common')

const helpInfo = require('../../data/help')
const strategyInfo = require('../../data/strategy')
const schemeInfo = require('../../data/scheme')
const modelInfo = require('../../data/model')

/**
 * [w2m.help] 유저가 봇 사용법을 요청 할 경우
 * 
 * @param {BotActionRequest} request 
 */
let handleHelp = (request) => {
  let requestedHelp = request.parameter[0]

  // 별도로 요청한 항목이 없으면 제목 및 간단한 목록 형태로 반환하고,
  // 명시되어있으면 해당 항목을 상세내용까지 모두 반환한다.
  let info = requestedHelp === undefined
    ? helpInfo
        .reduce((embed, help) => {
          return embed
            .addField(help.command, `${help.description}\nex:\t${help.usage[0]}`)
        }, new RichEmbed().setTitle('Help'))
    : helpInfo
        .filter(help => help.command.indexOf(requestedHelp) > -1)
        .splice(0, 1)
        .reduce((embed, help) => {
          embed.setTitle(`Help [${help.command}]`)
          embed.addField('Description', `${help.description}\n${help.description_detail}`)
          if (help.parameter) embed.addField('Parameter', help.parameter.map(p => `- ${p}`).join('\n'))
          embed.addField('Example', `${help.usage.map(u => `- ${u}`).join('\n')}`)
          return embed
        }, new RichEmbed())

  // request.reply('Here`s strategy information.')
  request.reply(info)
}

let handleFaq = (request) => {

}

/**
 * [w2m.strategy] 유저가 스트래티지 정보를 요청 할 경우
 * 
 * @param {BotActionRequest} request 
 */
let handleStrategy = (request) => {
  let requestedStrategy = request.parameter[0]

  // 별도로 요청한 스트래티지가 없으면 제목만 목록 형태로 반환하고,
  // 명시되어있으면 상세내용까지 모두 보여준다.
  let strategySpecified = requestedStrategy !== undefined
  let resultStrategyInfo = !strategySpecified
    ? new RichEmbed()
        .setTitle('Strategies')
        .setDescription(`${strategyInfo.map(strategy => `- ${strategy.name} [${strategy.value}]`).join('\n')}\n\n*명령어 뒤에 이름을 명시하면 해당 키워드가 포함되는 대상의 상세내용을 확인 가능합니다.*\n\`ex) w2m.strategy explosive\``)
    : strategyInfo
        .filter(strategy => strategy.name.toLowerCase().indexOf(requestedStrategy) > -1)
        .splice(0, 1)
        .reduce((embed, strategy) => embed.setTitle(strategy.name).setDescription((strategy.description || strategy.description_en).replace(/\n/g, '\n\n')), new RichEmbed())

  request.reply('Here`s strategy information.')
  request.reply(resultStrategyInfo)
}

/**
 * [w2m.scheme] 유저가 스킴 정보를 요청 할 경우
 * 
 * @param {BotActionRequest} request 
 */
let handleScheme = (request) => {
  let requestedSchemes = request.parameter

  // 별도로 요청한 스킴이 없으면 제목만 목록 형태로 반환하고,
  // 스킴명이 명시되어있으면 일치하는 목록을 5개까지 보여준다.
  let schemeSpecified = requestedSchemes.length > 0
  let resultSchemeInfo = !schemeSpecified
    ? new RichEmbed()
        .setTitle('Schemes')
        .setDescription(`${schemeInfo.map(scheme => `- ${scheme.name} [${scheme.value}]`).join('\n')}\n\n*명령어 뒤에 이름을 나열하면 해당 키워드가 포함되는 대상을 5개까지 확인 가능합니다.*\n\`ex) w2m.scheme breakthrough prisoner message ritual jump\``)
    : schemeInfo
        .filter(scheme => requestedSchemes.some(requested => scheme.name.toLowerCase().indexOf(requested) > -1))
        .splice(0, 5)
        .reduce((embed, scheme) => embed.addField(`${scheme.name} [${scheme.value}]`, scheme.description || scheme.description_en), new RichEmbed().setTitle('Schemes'))

  request.reply('Here`s scheme information.')
  request.reply(resultSchemeInfo)
}

/**
 * [w2m.model] 유저가 모델 정보를 요청 할 경우
 * 
 * @param {BotActionRequest} request 
 */
let handleModel = (request) => {
  let searchParameters = request.parameter
  if (searchParameters.length <= 0) {
    request.reply('이름이나 조건 정도는 알아야한다네.')
    return
  }

  let searchModelName = ''
  let searchConditions = {}

  // 검색 조건을 파싱한다.
  for (let parameter of searchParameters) {
    if (parameter.indexOf(':') > -1) {
      let [ condition, value ] = parameter.split(':')
      searchConditions[condition] = value
    } else {
      searchModelName = parameter
      // 모델명이 주어졌지만 너무 짧은 경우
      if (0 < searchModelName.length && searchModelName.length < 3) {
        request.reply(`엥, [${searchModelName}] 라니. 이것보단 자세히 말해줄 수 있지 않아?`)
      }
    }
  }

  console.log(`Try to find model with following parameters:\n- name: ${searchModelName}\n- condition: ${JSON.stringify(searchConditions)}`)

  let searchResult = modelInfo
    .filter(model => searchModelName.length <= 0 || (model.name !== undefined && model.name.toLowerCase().indexOf(searchModelName) > -1))
    .filter(model => searchConditions['k'] === undefined || model.keywords !== undefined && model.keywords.some(k => k.toLowerCase() === searchConditions['k']))
    .filter(model => searchConditions['c'] === undefined || model.characteristics !== undefined && model.characteristics.some(c => c.toLowerCase().startsWith(searchConditions['c']) > -1))
    // 최대 5건 까지만 출력
    .splice(0, 5)

  if (searchResult.length > 0) {
    request.reply(`오, 혹시 이 녀석이 네가 찾는 녀석이냐?`)
    searchResult.sort((prev, next) => (prev.cost - next.cost) * -1) // 내림차순 정렬
    searchResult.forEach(model => {
      // abilities
      let abilities = model.abilities.map(a => `**${a.name}**: ${a.description}`).join('\n')
      request.reply(new RichEmbed()
        .setTitle(`${model.name} [${model.faction}]`)
        .setDescription(`**${model.keywords.join(', ')}** ${model.characteristics.join(', ')}`)
        .addField('Size', `${model.baseSize}mm, Sz ${model.modelSize}`, true)
        .addField('Cost', model.cost, true)
        .addField('Health', model.health, true)
        .addField('Mv', model.move, true)
        .addField('Df', model.defence, true)
        .addField('Wp', model.willPower, true)
        .addField('Abilities', abilities))
    })
  } else {
    request.reply(`흠, 전혀 모르겠는데..`)
  }
}

module.exports = {
  bind: client => {
      client.on('message', (message) => {
        common.mapRequest('w2m.help', message, handleHelp)
        common.mapRequest('w2m.faq', message, handleFaq)
        common.mapRequest('w2m.strategy', message, handleStrategy)
        common.mapRequest('w2m.scheme', message, handleScheme)
        common.mapRequest('w2m.model', message, handleModel)
      })
  }
}
