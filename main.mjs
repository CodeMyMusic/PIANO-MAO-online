import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import * as Tone from 'tone'
let app = express()
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});

//let synth = new Tone.PolySynth().toDestination()

io.on('connect', (socket) => {
  console.log('A client has connected!');
  socket.on('myKey', key => {
    console.log('works')
  })
});

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (request, response) => {
  response.render('pages/index')
})

app.get('/login', (request, response) => {
  response.render('pages/login')
})

app.get('/test', (request, response) => {
  response.render('pages/test')
})

server.listen(8085)