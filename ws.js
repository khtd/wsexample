var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 40510})

var data = {
  "data":[
    [
      "977124",
      "2018-04-18 13:02:52",
      "before",
      "695208",
      "Калышенко Григорий Петрович",
      "20-12-1954",
      "X5 АГРО-Авто ",
      "147",
      "106",
      "83",
      "0.0",
      "False",
      "None",
      "34498",
      "АгроАвто х5 СПБ Адамант2",
      "",
      "Да",
      "-1",
      "1524056428",
      "1524056571"
    ]                    
  ]
}
function start(interval) {
  wss.on('connection', function (ws) {
    ws.on('message', function (message) {
      console.log('received: %s', message)
    })
    var id = setInterval(
      () => ws.send(JSON.stringify(data)),
      interval
    )

    setTimeout(
      () => {
        clearInterval(id);
        ws.close()
      },
      60000
    )
  })
}

module.exports = {
  start: start
}


