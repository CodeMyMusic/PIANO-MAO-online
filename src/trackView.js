import { rotation, lightness } from 'simpler-color';
import $ from 'jquery'

const NB_INTERLAYERS = 6
const FIRST_LABEL_COLOR = '#FFFF00'
const LABELS_COLORS = []
let color = FIRST_LABEL_COLOR

const LABEL_HEIGHT = 100/NB_INTERLAYERS

function trackView(){
    $('.track-content').css('border-color', FIRST_LABEL_COLOR)
    for (let i=0; i<6; i++){
        LABELS_COLORS.push(color)
        color = rotation(color, 50)
    }
    createLabels()
    resizeSelect()
}

function createLabels(){
    $('.labelLayout').each((i, label) => {
        // Le premier sera devant alors que le dernier tout derrière
        $(label).css('zIndex', NB_INTERLAYERS-i)

        $(label).find('.curved-top-right').find('.layerColor').css('backgroundColor', LABELS_COLORS[i])
        if (i>0){
            $(label).css('top', -LABEL_HEIGHT*i + '%')
        }
        if (i<NB_INTERLAYERS-1){
            $(label).css('height', LABEL_HEIGHT*2 + '%')
            $(label).find('.top-right-radius').css('backgroundColor', LABELS_COLORS[i+1])
            $(label).find('.bottom-left-radius').css('backgroundColor', LABELS_COLORS[i])
            
        }else{
            $(label).css('height', LABEL_HEIGHT)
            
        }
        $(label).find('.curved-bottom-left').find('.layerColor').css('backgroundColor', LABELS_COLORS[i+1])
        $('.label:nth-child('+ (i+1) +')').on('click', function(){
            $('#track-content').css('border-color', LABELS_COLORS[i])
        })
    })
}

function resizeSelect(){
    $('.all-labels-user-select').css('grid-template-rows', `repeat(${NB_INTERLAYERS}, 1fr)`)
}

export default trackView
