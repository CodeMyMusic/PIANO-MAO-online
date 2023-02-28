const NB_OCTAVES = 3

window.addEventListener('DOMContentLoaded', function () {

    /*
    ////////// RAINBOW ANIMATION ///////////////////
    */

    let firstOctave = $('.octave')
    const setOctaves = (first_octave, nb) => {
    
        for (let i = 0; i<nb; i++){
            let octave = $(first_octave).clone()
            octave.attr('id', 'octave'+(i+1))
/*             octaveKeys = $('#octave'+(i+1) + ' key-')
            addNumberToKey(octaveKeys) */
            $(first_octave).parent().append(octave)
        }
    
        $(first_octave).attr('id', 'octave0')
    }
    
    for (let octave of firstOctave){

        setOctaves(octave, NB_OCTAVES-1)
    }
    
    const ALL_WHITE_KEYS_TOP = $('.white-keys canvas')
    const ALL_BLACK_KEYS_TOP = $('.black-keys canvas')

    const ALL_KEYS = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']


    //NO DRAG
    $('#piano').attr('draggable', false);
    $('#all-keys').attr('draggable', false);
    ALL_WHITE_KEYS_TOP.each(function() {
        $(this).attr('draggable', false);
    });
    //

    //Quand on appuie sur une note
    ALL_WHITE_KEYS_TOP.mousedown(function(){
        if ($(this).attr('class').search('highlighted') > 0){            
            $(this).removeClass('highlighted')
            ALL_WHITE_KEYS_TOP.mouseover(function(){
                $(this).removeClass('highlighted')
                $(this).unbind('mouseover')
            })
        }else{
            $(this).addClass('highlighted')
            ALL_WHITE_KEYS_TOP.mouseover(function(){
                $(this).addClass('highlighted')
                $(this).unbind('mouseover')
            })
        }

    })
    //Si on quitte le piano
    $(document).mouseup(function(){
        ALL_WHITE_KEYS_TOP.unbind('mouseover')
    })

/*     $('.remove-highlights').click(function(){
        rm.autoplay = true
        rm.restart()
    })

    let rm = anime({
        targets: '.white-keys key-', 
        duration: 2000, 
        background: "#AAAA",
        autoplay: false,
        complete: function(){
            $('key-[class$="highlighted"]').removeClass('highlighted')
        }
    }) */
    let pianoScale;
    const animPianoScale = {
        end: false,
        anim(end){
            pianoScale = anime({
                targets: '#piano3D',
                duration: 300,
                scale: end ? 1 : 1.05,
                easing: 'linear',
                direction: 'alternate',
                loop: 2,
                loopComplete: function(anim){
                    anim.pause;
                }
            })
            $('#piano3D').off('mouseover')
        }
    }

    $('#piano3D').on('mouseover', animPianoScale).on('mouseleave', function(){
        pianoScale.play;
        setTimeout(
            animPianoScale, 300
        )
    })


});