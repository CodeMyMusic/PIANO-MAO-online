// Ensure that canvas drawing size is its size
function setCanvasSize(elmt){
    elmt.width = $(elmt).width()
    elmt.height = $(elmt).height()
}

const ALL_KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']


window.addEventListener('DOMContentLoaded', function () {
    
    const CANVAS_TOP = $('#piano-top-background')
    const CANVAS_FRONT = $('#piano-front-background')

    let FACES = ['#piano-top', '#white-keys-front']
    
    FACES = FACES.map(face => {
        let str = face
        let faceKeys = $(face + ' .octave')
        let currentFace = {[str]: []}
        faceKeys.each((octave) => {
            currentFace[str].push(ALL_KEYS.map(key => {return $(octave).attr('id') + ' ' + key}))
          })
          console.log(currentFace[str])
        return currentFace
    })

    console.log(FACES)
    // for (let octave of octavesID){

    // }




    // for (let key of ALL_BLACK_KEYS){
    //     let keyctx = key.getContext("2d")
    //     //key.width = 17
    //     key.height = 500
    //     keyctx.fillStyle = "blue";
    //     keyctx.fillRect(0, 0, key.width, key.height);
    // }

    // draw()

    // $(window).on("resize", function(){
    //     draw()
    // })

    // function draw(){
    //     setCanvasSize(CANVAS[0])

    //     let ctx = CANVAS[0].getContext("2d")
    //     ctx.clearRect(0, 0, CANVAS[0].width, CANVAS[0].height)
    
    //     let img1 = new Image(1, 1)
    //     img1.src = '../images/mosaic.png'
    //     img1.onload = function(){

    //         for (let key of ALL_BLACK_KEYS){
    //             console.log(
    //                 key,
    //                 key.width, $(key).width(),
    //                 key.height, $(key).height()
    //             )
    //             ctx.beginPath();
    //             ctx.moveTo(10,0);
    //             ctx.lineTo(10, $(key).height());
    //             ctx.stroke();
    //             ctx.beginPath();
    //             ctx.moveTo($(key).offset().left,10);
    //             ctx.lineTo($(key).offset().left + 41, 10);
    //             ctx.stroke();
    //             setCanvasSize(key)
    //             console.log(
    //                 key,
    //                 key.width,
    //                 key.height
    //             )
    //             let keyctx = key.getContext("2d")
    //             key.width = 10
    //             console.log(
    //                 key,
    //                 key.width, $(key).width(),
    //                 key.height, $(key).height()
    //             )
    //             keyctx.drawImage(img1, 0, 0, 167, 766, 0, 0, key.width, key.height)
    //             //ctx.fillStyle = "blue";
    //             //ctx.fillRect($(key).offset().left, $(key).offset().top, $(key).innerWidth(), $(key).innerHeight());
    //         }
    //     }
    // }
});
