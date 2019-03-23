const express = require('express')
const router = express.Router()

const botStatAction = require('../bot/actions/stat')

router.get('/register/:userId/:opponentId', (req, res) => {
  res.renderVue('statRegister.vue', req.params, req.vueOptions);
})

router.post('/register', (req, res) => {
  console.log(req.body)

  // process stat request

  // announce result to user and opponent in discord
  botStatAction.handleRequestRegistered(req.params)

  res.json({ success: true })
})

module.exports = router
