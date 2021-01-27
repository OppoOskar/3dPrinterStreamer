const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.APP_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.use('/files/timelapses', express.static(__dirname + '/files/timelapses'))
// add custom path here
// server.post('/request/custom', custom);
//server.post('/timelapses', );

  
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:3000')
  })
})