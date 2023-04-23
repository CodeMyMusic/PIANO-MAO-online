import path from 'path';
import { fileURLToPath } from 'url'

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import ViteExpress from 'vite-express'
import mysql from 'mysql'

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Hellohi1231#',
  database : 'piano'
});
 
// connection.connect();

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
    connection.query('SELECT * FROM `piste`', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
    });
  })
});

app.set('view engine', 'ejs');
app.use(express.static('src'));

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/views/pages/index.html'));
//   //res.render('pages/index', {title: 'non'})
// });

app.get('/login', (request, res) => {
  res.sendFile(path.join(__dirname+'/views/pagesHTML/login.html'));
  //res.render('pages/login')
})

app.get('/test', (request, res) => {
  res.sendFile(path.join(__dirname+'/views/pagesHTML/test.html'));
  //res.render('pages/test')
})

ViteExpress.bind(app, server)