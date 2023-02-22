const KEYS_ANIM = [0, 1, 2, 3, 4, 5, 6]

const rainBowAnimation = () => {

    let animateKey = (nbOctave, nbKey) => {
        let g = 'toColor'
        let key = $(`#octave${nbOctave} .white-keys key-:nth-child(${nbKey+1})`);
        let fromColor = key.css('backgroundColor')
        let final = fromColor.replace((fromColor.match(/(\d+)/)[0]), (((fromColor.match(/(\d+)/)[0]) + 20) % 255));
        console.log(final)
        //let final = 'rgba('+ hue + ', 100%, 50%, .4)'
        return {
            targets: key[0],
            duration: 750,
            keyframes: [
                {backgroundColor: fromColor},
                {backgroundColor: final},
            ],
            direction: 'alternate',
            easing: 'easeOutCubic',
        }
    }
/*     let animateKey = (nbOctave, key, hue) => {
        let $key = $(`#octave${nbOctave} .white-keys key-:nth-child(${key+1})`);
        let fromColor = $key.data('animating') ? $key.css('background-color') : '#FFF';
        $key.data('animating', true);
        $key.data('newAnimation', false)
        console.log($key)
        return {
            targets: $key[0],
            duration: duration,
            keyframes: [
                {backgroundColor: fromColor},
                {backgroundColor: 'hsl('+ hue + ', 100%, 50%)'},
                {backgroundColor: '#FFF'}
            ],
            easing: 'linear',
            update: function(anim){
                if ($key.data('newAnimation')){
                    console.log('ff')
                    $key.data('newAnimation', false)
                    anim.pause()
                }
            },
            complete: () => $key.data('animating', false)
        }
    } */

    let nextOctaveRainbow = (octave, delay) => {
        let octaveKey = animateNextKey(0, KEYS_ANIM[0], hue)

        let nbOctave = 0

        // First key starting right now
            
        octave.add(octaveKey);
        
        hue += 20
        
        //A delay of 100 ms between each key
        for (let i = 1; i<KEYS_ANIM.length; i++){
            let key = KEYS_ANIM[i]
            hue = hue % 360
            
            octaveKey = animateNextKey(nbOctave, key, hue)
            
            octave.add(octaveKey, delay);
            
            hue += 20       
        }  
    }

    let octaveRainbow = (nbOctave) => {
        //A delay of 500 ms between each key
        let addKey = nbKey => {

            if (nbKey < KEYS_ANIM.length){

                anime( animateKey(nbOctave, KEYS_ANIM[nbKey]) );
                
                setTimeout(addKey, 75, nbKey + 1);
            }     
        }

        addKey(0)        
    }

    for (let nb = 0; nb<NB_OCTAVES; nb++){
        let hue = (nb*100) % 360; 
        for (let nbKey of KEYS_ANIM){
           let key = $(`#octave${nb} .white-keys key-:nth-child(${KEYS_ANIM[nbKey] + 1})`);
           key.css('backgroundColor', 'hsla('+ hue + ', 100%, 50%, .2)')
           hue = ((hue + 20) % 360)
        }
    }

    animateOctaves()

    function animateOctaves(){
        for (let nb = 0; nb<NB_OCTAVES; nb++){
            octaveRainbow(nb)
        }
    }

    //setInterval(animateOctaves, 2000)

}

window.addEventListener('DOMContentLoaded', function () {
    rainBowAnimation()
})

