const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.APP_ENV !== 'production'
console.log(process.env.OCTOPRINT_APIKEY)
const conf = {"env": {"OP_SETTINGS": {"APIKEY": process.env.OCTOPRINT_APIKEY, "IP": process.env.OCTOPRINT_IP, "PORT": process.env.OCTOPRINT_PORT}}};
const app = next({dev, conf})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.use('/files/timelapses', express.static('/files/timelapses'))
// add custom path here
// server.post('/request/custom', custom);
//server.post('/timelapses', );

  
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})
