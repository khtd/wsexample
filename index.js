const express = require('express')
const argv = require('yargs').argv
const ws = require('./ws')

var interval

if(argv.now){
  interval = 60000/15
} else if (argv.future) {
  interval = 60000/150
}

ws.start(interval)

const app = express()
const PORT = 4200

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})