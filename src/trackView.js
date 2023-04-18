import { rotation, saturation } from 'simpler-color';
import $ from 'jquery'

function trackView(){
    let firstLabelColor = '#FFFF00'
    let newColor = firstLabelColor;
    
    $('.label').each((i, label) => {
        $(label).css('backgroundColor', newColor)
        $(label).css('content', (i+1))
        newColor = rotation(newColor, 50)
    })
}

export default trackView
