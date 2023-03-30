const socket = io();

socket.on('connect', () => {
  console.log('Connected to server!');
});

let synth = new Tone.PolySynth().toDestination()

$('.octave').each(function() {
    let octaveNb = $(this).attr('id')
    $(this).find('canvas').each(function(){
        $(this).on('click', function(){
            let key = $(this).attr('data-key') + (parseInt(octaveNb[octaveNb.length - 1]) + 2)
            socket.emit('myKey', { key: key})
            console.log(key)
            synth.triggerAttackRelease(key, "16n")
        })
    })
})


// each(key =>{
//     console.log('lol');

// })