const express = require('express')
const expressVue = require('express-vue')
const path = require('path')

const app = express()
const port = 9000

// middlewares
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// routers
const historyRouter = require('./router/history')

const expressVueMiddleware = expressVue.init({
  rootPath: path.join(__dirname, 'views'),
  head: {
    title: 'Welcome to Malifuax!',
    metas: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' }
    ],
    scripts: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js' }
    ],
    styles: [
      { 
        style: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        integrity: 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T',
        crossorigin: 'anonymous'
      }
    ]
  }
})

app.use(expressVueMiddleware)
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/history', historyRouter)

// discord bot initialization
require('./bot').initialize()

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`)
})
