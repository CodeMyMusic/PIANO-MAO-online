import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import ViteExpress from 'vite-express'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let app = express()
const server = http.createServer(app).listen(3000, () => { 
  console.log("Server is listening!")
});
const io = new Server(server, {cors: {origin: "*"}});

//let synth = new Tone.PolySynth().toDestination()

io.on('connect', (socket) => {
  console.log('A client has connected!');
  socket.on('myKey', key => {
    console.log('works' + key)
  })
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/views/pages/index.html'));
//   //res.render('pages/index', {title: 'non'})
// });

app.get('/login', (request, res) => {
  res.sendFile(path.join(__dirname+'/views/pages/login.html'));
  //res.render('pages/login')
})

app.get('/test', (request, res) => {
  res.sendFile(path.join(__dirname+'/views/pages/test.html'));
  //res.render('pages/test')
})

ViteExpress.bind(app, server)