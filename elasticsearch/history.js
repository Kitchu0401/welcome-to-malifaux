const client = require('./client')

const INDEX_NAME = 'history'
const TYPE_NAME = 'doc'

/**
 * 전적 기록 등록
 */
let indexHistory = async (history) => {
  const indexResponse = await client.index({
    index: INDEX_NAME,
    type: TYPE_NAME,
    id: history.id,
    body: history
  })

  console.log(`History created: ${history.id}`)
  return indexResponse.result === 'created'
}

module.exports = {
  indexHistory
}
