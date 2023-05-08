import $, { event } from "jquery"

import {io} from "socket.io-client"

let Tone;
let synth;

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server!');
});

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
            synth = new Tone.PolySynth().toDestination();
        })
        $('#piano3D').on('click', function () {
            ready.remove();
        })
        $('.octave').each(function() {
            let octaveNb = $(this).attr('id')
            $(this).find('canvas').each(function(){
                $(this).on('click', function(){
                    let key = $(this).attr('data-key') + (parseInt(octaveNb[octaveNb.length - 1]) + 2)
                    synth.triggerAttackRelease(key, "16n")
                })
            })
        })
    })
}

export default playSynth
