const socket = io();

socket.on('connect', () => {
  console.log('Connected to server!');
});

let synth = new Tone.PolySynth().toDestination()

$('.octave').each(function() {
    let octaveNb = $(this).attr('id')
    $(this).find('canvas').each(function(){
        $(this).on('click', function(){
            let key = toString($(this).attr('class')) + octaveNb[octaveNb.length - 1]
            socket.emit('myKey', { key: key})
            synth.triggerAttackRelease("E3", "16n")
        })
    })
})


// each(key =>{
//     console.log('lol');

// })