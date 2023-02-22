const PIANO = $('#piano')
const pointerKey = $('pointer-key')

console.log(pointerKey)


$('#all-keys').hover(
    function(e){
        pointerKey.show()
        pointerKey.offset({top: e.pageY-pointerKey.height()/2, left: e.pageX-pointerKey.width()/2})
        $(this).mousemove(function(e){
            pointerKey.offset({top: e.pageY-pointerKey.height()/2, left: e.pageX-pointerKey.width()/2})
        })
    }, function(){
        pointerKey.hide();
    }
);