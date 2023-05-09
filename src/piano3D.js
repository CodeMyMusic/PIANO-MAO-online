import $, { event } from "jquery"

import {io} from "socket.io-client"

import Track from "./MAO/Track";

let Tone;
let synth;

const socket = io();

socket.on('connection', () => {
  console.log('Connected to server!');
});

let RECORD = true

// RECORDER

let timeStartRecord;

function playSynth(){
    let readytxt = $('.notReady h1')
    let ready = $('.notReady')
    ready.on('click', function(e){
        e.stopPropagation()
        readytxt.html("⌛ Patientez...").css('color', 'white')
        import('tone').then(module => {
            readytxt.html("✅ Jouez !").css('color', '#00d26a')
            ready.css('pointerEvents', 'none')
            Tone = module
            synth = new Tone.PolySynth().toDestination()

            listenNotes()
            // record()
        })
        $('#piano3D').on('click', function () {
            ready.remove();
        })
       
    })
}

function listenNotes(){
    $('.octave').each(function() {
        let octaveNb = $(this).attr('id')
        $(this).find('canvas').each(function(){
            $(this).on('mousedown', function(){
                let key = $(this).attr('data-key') + (parseInt(octaveNb[octaveNb.length - 1]) + 2)
                synth.triggerAttackRelease(key, "16n")
            })
        })
    })
}

function record(){
    let NOTES = []
    let timeStartRecord = Date.now();
    $('.octave').each(function() {
        let octaveNb = $(this).attr('id')
        $(this).find('canvas').each(function(){
            let key;
            let absoluteTime;
            let time;
            $(this).on('mousedown', function(){
                key = $(this).attr('data-key') + (parseInt(octaveNb[octaveNb.length - 1]) + 2)
                absoluteTime = Date.now()
                time = (absoluteTime - timeStartRecord) / 1000;
            })
            $(this).on('mouseup', function(){
                NOTES.push(
                    {
                        name: key,
                        time: time,
                        duration: (Date.now() - absoluteTime) / 1000
                    }
                )
            })
        })   
    })
    $('#record').on('click', function(){
        socket.emit("toMidiFile", NOTES)
        socket.on("res", midi => console.log(midi))
    })
}

export default playSynth
