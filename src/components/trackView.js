import { rotation, lightness } from 'simpler-color';
import $ from 'jquery'

const NB_INTERLAYERS = 6
const FIRST_LABEL_COLOR = '#FFFF00'
const LABELS_COLORS = []
let color = FIRST_LABEL_COLOR

const LABEL_HEIGHT = 100/NB_INTERLAYERS

const coveringLabel = $('.covering-label')

function trackView(){
    $('.track-content').css('border-color', FIRST_LABEL_COLOR)
    for (let i=0; i<6; i++){
        LABELS_COLORS.push(color)
        color = rotation(color, 50)
    }
    createLabels(
        $('.front-all-labels'), NB_INTERLAYERS
    )
    resizeSelect()
}

function createLabels(LABELS, nb){
    LABELS.find('.all-labels-layout').each((i, label) => {
        // Le premier sera devant alors que le dernier tout derrière
        $(label).css('zIndex', nb-i)

        $(label).find('.curved-top-right').find('.layerColor').css('backgroundColor', LABELS_COLORS[i])
        if (i>0){
            $(label).css('top', -LABEL_HEIGHT*i + '%')
        }
        if (i<nb-1){
            $(label).css('height', LABEL_HEIGHT*2 + '%')
            $(label).find('.top-right-radius').css('backgroundColor', LABELS_COLORS[i+1])
            $(label).find('.bottom-left-radius').css('backgroundColor', LABELS_COLORS[i])

            // $(label).find('.curved-top-right').css('width', (50 / (i+2) + 50) + '%')
            // $(label).find('.curved-top-right').css('left',  60-$(label).find('.curved-top-right').width())

            
        }else{
            $(label).css('height', LABEL_HEIGHT)            
        }

        // $(label).find('.curved-bottom-left').css('width', (50 / (i+1) + 50) + '%')
        // $(label).find('.curved-bottom-left').css('left', 60-$(label).find('.curved-bottom-left').width());
        // $(label).css('transform', 'translateX('+(60-$(label).width())+'px)')

        $(label).find('.curved-bottom-left').find('.layerColor').css('backgroundColor', LABELS_COLORS[i+1])
    })
    $(LABELS).find('.label').each((i, label) => {

        $(label).on('click', function(){
            if (i > 0){
                createLabels(
                    $('.behindLabels'), i
                )
            } 
            // On veut cacher tous les labels qui sont au-dessus
            for (let j=0; j<i; j++){
                $('#lb'+(j+1)).hide()
                // On met la même couleur en dessous
            }
            coveringLabel.css('backgroundColor', LABELS_COLORS[i])
            coveringLabel.css('height', 'calc('+LABEL_HEIGHT*i+'% + 10px)')
            $(label).css('flex-grow', (i+1))
            $('.track-content').css('border-color', LABELS_COLORS[i])
        })
    })
}

function resizeSelect(){
    $('.all-labels-user-select').css('grid-template-rows', `auto`)
}

export default trackView
