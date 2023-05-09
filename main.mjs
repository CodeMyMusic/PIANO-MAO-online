import path from 'path';
import { fileURLToPath } from 'url'

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import ViteExpress from 'vite-express'

// UN PROJET


import * as fs from 'node:fs';

// POUR RECUPERER OU EXPORTER MIDI
import pkg from '@tonejs/midi'
const {Midi} = pkg;
 

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let app = express()
const server = http.createServer(app).listen(3000, () => { 
  console.log("Server is listening!")
});

const io = new Server(server, {cors: {origin: "*"}});

//let synth = new Tone.PolySynth().toDestination()

io.on('connection', (socket) => {
  console.log('A client has connected!');
  socket.emit("res", "d")
  socket.on('toMidiFile', NOTES => {
    // create a new midi file
    let midi = new Midi()
    // add a track
    const track = midi.addTrack()
    NOTES.forEach(note => {
        track.addNote(note)
    })

    let midiFile = Buffer.from(midi.toArray());


  // Execute INSERT query to store buffer in database
  connection.query('INSERT INTO piste SET ?', { file: midiFile }, (error, results, fields) => {
    if (error) {
      console.error(error);
    } else {
      console.log('File stored in database successfully!');
    }
    // Close MySQL connection
    connection.end();
  });

  });
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