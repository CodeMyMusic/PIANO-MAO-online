const NB_OCTAVES = 3

window.addEventListener('DOMContentLoaded', function () {

    /*
    ////////// RAINBOW ANIMATION ///////////////////
    */

    const setOctaves = nb => {
        let firstOctave = $('.octave')
    
        for (let i = 0; i<nb; i++){
            let octave = firstOctave.clone()
            octave.attr('id', 'octave'+(i+1))
/*             octaveKeys = $('#octave'+(i+1) + ' key-')
            addNumberToKey(octaveKeys) */
            firstOctave.parent().append(octave)
        }
    
        firstOctave.attr('id', 'octave0')
    }
    
    setOctaves(NB_OCTAVES-1)
    
    const ALL_WHITE_KEYS = $('.white-keys canvas')
    const ALL_BLACK_KEYS = $('.black-keys canvas')


    //NO DRAG
    $('#piano').attr('draggable', false);
    $('#all-keys').attr('draggable', false);
    ALL_WHITE_KEYS.each(function() {
        $(this).attr('draggable', false);
    });
    //

    //Quand on appuie sur une note
    ALL_WHITE_KEYS.mousedown(function(){
        if ($(this).attr('class').search('highlighted') > 0){            
            $(this).removeClass('highlighted')
            ALL_WHITE_KEYS.mouseover(function(){
                $(this).removeClass('highlighted')
                $(this).unbind('mouseover')
            })
        }else{
            $(this).addClass('highlighted')
            ALL_WHITE_KEYS.mouseover(function(){
                $(this).addClass('highlighted')
                $(this).unbind('mouseover')
            })
        }

    })
    //Si on quitte le piano
    $(document).mouseup(function(){
        ALL_WHITE_KEYS.unbind('mouseover')
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

    //module.exports = {ALL_BLACK_KEYS, ALL_WHITE_KEYS}
});