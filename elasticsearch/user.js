const client = require('./client')

const INDEX_NAME = 'user'
const TYPE_NAME = 'doc'

/**
 * 사용자 체크
 */
let existUser = (id) => {
  return client.exists({
    index: INDEX_NAME,
    type: TYPE_NAME,
    id: id
  })
}

/**
 * 사용자 단건 조회
 */
let getUser = (id) => {
  return client.get({
    index: INDEX_NAME,
    type: TYPE_NAME,
    id: id
  })
  .then(response => response._source)
  .catch(error => {
    console.error(error)
    return null
  })
}

/**
 * 사용자 등록
 */
let indexUser = async (user) => {
  const exists = await existUser(user.id)

  if (!exists) {
    const indexResponse = await client.index({
      index: INDEX_NAME,
      type: TYPE_NAME,
      id: user.id,
      body: {
        id: user.id,
        name: user.username,
        history: [],
        status: {
          win: 0,
          lose: 0,
          rate_winning: 0.0,
        },
        inserted: new Date().getTime()
      }
    })

    console.log(`User created: ${user.id}`)
    return indexResponse.result === 'created'
  }

  return exists
}

module.exports = {
  existUser,
  getUser,
  indexUser
}
