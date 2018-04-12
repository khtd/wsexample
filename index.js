const express = require('express')
const ws = require('./ws')

const app = express()
const PORT = 4200

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})