const KEYS_ANIM = [0, 1, 2, 3, 4, 5, 6]

const rainBowAnimation = () => {

    let animateKeyHue = (key, hue) => {
        let from = key.css('backdrop-filter')
        let to = `opacity(1) hue-rotate(${hue}deg)`
        return [
            {backdropFilter: from}, 
            {backdropFilter: to}
        ];
    }

    let animateKeyImage = (key, img) => {
        let from = key.css('background-image')
        let to = 'url('+img+')'
        return [
            {backgroundImage: from}, 
            {backgroundImage: to}
        ]
    }

    let animateKey = (key, keyframes) => {
        return {
            targets: key[0],
            duration: 750,
            keyframes: keyframes,
            direction: 'alternate',
            easing: 'easeOutCubic',
        };
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
            
            octaveKey = animateNextKeyHue(nbOctave, key, hue)
            
            octave.add(octaveKey, delay);
            
            hue += 20       
        }  
    }

    let octaveRainbow = (nbOctave) => {
        let hue = 0
        //A delay of 500 ms between each key
        let addKey = nbKey => {

            if (nbKey < KEYS_ANIM.length){
                hue = hue % 360

                let key = $(`#octave${nbOctave} .white-keys canvas:nth-child(${nbKey+1})`);

                let keyframes = animateKeyImage(key, '../images/mosaic.png')
                //let keyframes = animateKeyHue(key, hue)

                anime(animateKey(key, keyframes))

                hue += 20
                
                setTimeout(addKey, 75, nbKey + 1);
            }     
        }

        addKey(0)        
    }

    // for (let nb = 0; nb<NB_OCTAVES; nb++){
    //     let hue = (nb*100) % 360; 
    //     for (let nbKey of KEYS_ANIM){
    //        let key = $(`#octave${nb} .white-keys key-:nth-child(${KEYS_ANIM[nbKey] + 1})`);
    //        key.css('backgroundColor', 'hsla('+ hue + ', 100%, 50%, .2)')
    //        hue = ((hue + 20) % 360)
    //     }
    // }

    for (let nb = 0; nb<NB_OCTAVES; nb++){
        let hue = (nb*100) % 360; 
        for (let nbKey of KEYS_ANIM){
        let key = $(`#octave${nb} .white-keys canvas:nth-child(${KEYS_ANIM[nbKey] + 1})`);
           key.css('background-image', 'url(../images/dauphin.jpg)')
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

