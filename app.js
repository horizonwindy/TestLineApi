const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
})
app.listen(port)

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer /KoLGi1fHK6cBK+AHaGvpAWCxatfs9aHfcJp1Lcor0H100ISYWJwPD8pQhOV0u7F0PZniGi4aFxo9yHBp9gISxxZ0QSWTrpBoXMQMX/pzuFKLgouKXoQ9LNBFIgluDTbHZbAjsjcdZ2xe1IO33ePnwdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}