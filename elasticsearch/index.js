const client = require('./client')
const indices = require('./indices.json')

const history = require('./history')
const user = require('./user')

let initializeIndices = () => {
  const indexNames = Object.keys(indices)

  indexNames.forEach(async (index) => {
    let exists = await client.indices.exists({ index: index })

    console.log(`Index [${index}] does ${exists ? 'exists.' : 'not exists. Trying to create one.'}`)

    if (!exists) {
      await client.indices.create({
        index: index,
        body: indices[index]
      })
    }
  })
}

initializeIndices()

module.exports = {
  history,
  user
}
