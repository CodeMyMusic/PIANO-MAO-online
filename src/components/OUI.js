import $ from "jquery"
import anime from "animejs"


const rainBowAnimation = () => {
    const KEYS_ANIM = [0, 1, 2, 3, 4, 5, 6]

    let animateKeyHue = (key, hue) => {
        return [
            {backdropFilter: key.css('backdrop-filter')}, 
            {backdropFilter: `opacity(1) hue-rotate(${hue}deg)`}
        ];
    }

    let animateKeyImage = (key, img) => {
        return [
            {backgroundImage: key.css('background-image')}, 
            {backgroundImage: 'url('+img+')'}
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

    let octaveRainbow = (nbOctave) => {
        let hue = 0
        //A delay of 500 ms between each key
        let addKey = nbKey => {

            if (nbKey < KEYS_ANIM.length){
                hue = hue % 360

                let key = $(`#octave${nbOctave} .white-keys canvas:nth-child(${nbKey+1})`);

                //let keyframes = animateKeyImage(key, '../images/mosaic.png')
                let keyframes = animateKeyHue(key, hue)

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

    // for (let nb = 0; nb<NB_OCTAVES; nb++){
    //     let hue = (nb*100) % 360; 
    //     for (let nbKey of KEYS_ANIM){
    //     let key = $(`#octave${nb} .white-keys canvas:nth-child(${KEYS_ANIM[nbKey] + 1})`);
    //     }
    // }

    animateOctaves()

    function animateOctaves(){
        for (let nb = 0; nb<3; nb++){
            octaveRainbow(nb + 1)
        }
    }

    //setInterval(animateOctaves, 2000)

}
 
export default rainBowAnimation

