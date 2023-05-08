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

            record()

            // recorder()
        })
        $('#piano3D').on('click', function () {
            ready.remove();
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
                absoluteTime = Date.now()
                time = (absoluteTime - timeStartRecord) / 1000;
                key = $(this).attr('data-key') + (parseInt(octaveNb[octaveNb.length - 1]) + 2)
                synth.triggerAttackRelease(key, "16n")
            })
            if (record){
                $(this).on('mouseup', function(){
                    NOTES.push(
                        {
                            name: key,
                            time: time,
                            duration: (Date.now() - absoluteTime) / 1000
                        }
                    )
                })
            }
        })
    })
    $('#record').on('click', function(){
        RECORD = false
        socket.emit("toMidiFile", NOTES)
        socket.on("res", midi => console.log(midi))
    })
}

function recorder() {
    // convert the sequence to a JSON object
    const data = {
        header: {
            name: 'My sequence',
            PPQ: Tone.Transport.PPQ,
            tempos: [{ time: 0, bpm: Tone.Transport.bpm.value }],
            timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }],
        },
        duration: sequence.duration,
        tracks: [
            {
                name: '',
                channel: 0,
                notes: sequence.at(0).map(note => ({
                    midi: Tone.Frequency(note, 'midi').toMidi(),
                    time: Tone.Ticks(note.time).toSeconds(),
                    ticks: note.time,
                    name: note.toString(),
                    pitch: note.pitch,
                    octave: note.octave,
                    velocity: note.velocity,
                    duration: Tone.Ticks(note.duration).toSeconds(),
                })),
                controlChanges: {},
                instrument: {},
            },
        ],
    };

    // convert the data object to a JSON string and save it as a file
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    window.saveAs(blob, 'my-sequence.json');
}

export default playSynth
