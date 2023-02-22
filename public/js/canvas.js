
window.addEventListener('DOMContentLoaded', function () {
    
    const ALL_BLACK_KEYS = $('.black-keys canvas')
    
    console.log(ALL_BLACK_KEYS)
    
    for (let key of ALL_BLACK_KEYS){
        console.log(key)
        let ctx = key.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, key.width, key.height);
    }
});
