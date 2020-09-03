import { iniciaCronometro } from './cronometro.js';
import { Meteoro } from './meteoro.js'

$(document).ready(function () {
    let cron = new iniciaCronometro(15);
    let meteoro = new Meteoro(15)
    $('#canvasPrincipal').click(function (env) {
        let x = env.clientX,
            y = env.clientY
        console.log(`posX: ${x} - posY: ${y}`)
        meteoro.destroiMeteoro(x, y)
    })
    //  cron.iniciar()
})








// let meteoro_img_path = ['Nova pasta/BraveBlobAssetPack/Sprites/Rocks/FireRock2']
// let canvas = jQuery('canvas').get(0);
// let meteoro_img = document.createElement('img');
// meteoro_img.src = meteoro_img_path
// let dpi = window.devicePixelRatio;
// canvas.setAttribute('height',canvas.clientHeight*dpi);
// canvas.setAttribute('width',canvas.clientHeight*dpi);
// let ctx = canvas.getContext('2d');




