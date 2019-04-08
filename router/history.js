const express = require('express')
const router = express.Router()

const esClient = require('../elasticsearch')
const botHistoryAction = require('../bot/actions/history')

router.get('/register/:requesterId/:opponentId', (req, res) => {
  let { requesterId, opponentId } = req.params

  // check both id registered
  Promise.all([requesterId, opponentId].map(esClient.user.existUser))
  .then(exists => {
    // if someone is not identified
    if (!exists.every(exist => exist)) {
      res.renderVue('error.vue', { message: 'There are strangers among us!'  }, req.vueOptions);
      return
    }

    res.renderVue('historyRegister.vue', req.params, req.vueOptions);
  })
})

router.post('/register', (req, res) => {
  // announce result to user and opponent in discord
  botHistoryAction.handleRequestRegistered(req.body)

  res.json({ success: true })
})

module.exports = router
