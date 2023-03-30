window.addEventListener('DOMContentLoaded', function () {
    
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

    $('.octave').each(function() {
        $(this).find('canvas').each(function(){
            $(this).on('mousedown', function(){
                if ($(this).attr('class').search('highlighted') > 0){            
                    $(this).removeClass('highlighted')
                    ALL_WHITE_KEYS_TOP.on('mousedown', function(){
                        $(this).removeClass('highlighted')
                        $(this).off('mouseover')
                    })
                }else{
                    $(this).addClass('highlighted')
                    ALL_WHITE_KEYS_TOP.on('mouseover', function(){
                        $(this).addClass('highlighted')
                        $(this).off('mouseover')
                    })
                }
        })
    })

    })
    //Si on quitte le piano
    $(document).on('mouseup', function(){
        ALL_WHITE_KEYS_TOP.off('mouseover')
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

    $('#piano3D').on('mouseover', animPianoScale.anim(true)).on('mouseleave', function(){
        setTimeout(
            animPianoScale.anim(true), 300
        )
    })


});