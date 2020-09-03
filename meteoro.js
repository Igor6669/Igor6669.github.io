export function Meteoro() {

    let meteoros = []

    let image = new Image();
    image.src = 'Nova pasta/BraveBlobAssetPack/Sprites/Rocks/FireRock2.png'



    let canvas = document.getElementById('canvasPrincipal');
    let ctx = canvas.getContext('2d')
    let dpi = window.devicePixelRatio;
    canvas.setAttribute('height', canvas.clientHeight * dpi)
    canvas.setAttribute('width', canvas.clientWidth * dpi)
    var drawInterval;
    var vidaRestante = 1
    var meteorosIniciais;



    function Meteoro(canvasWidth, canvasHeight) {
        this.size = Math.floor(Math.random() * 25) + 50;
        this.posx = Math.floor(Math.random() * (canvasWidth - this.size));
        this.posy = -this.size
        this.speed = Math.random() * 1.3 + 1
        //this.speed = 0
        this.intervalo = undefined;
    }



    function criarMeteoro(numMeteoros) {
        meteorosIniciais = numMeteoros
        // let canvas = document.getElementById('canvasPrincipal');
        // let ctx = canvas.getContext('2d')
        // let dpi = window.devicePixelRatio;
        // canvas.setAttribute('height', canvas.clientHeight*dpi)
        // canvas.setAttribute('width', canvas.clientWidth*dpi)
        meteoros = []
        for (let i = 0; i < numMeteoros; i++) {
            meteoros.push(new Meteoro(canvas.width, canvas.height))
        }
        for (let meteoro of meteoros) {
            setTimeout(function () {
                meteoro.intervalo = setInterval(movimentaMeteoro, 10, meteoro);

            }, Math.floor(Math.random() * numMeteoros * 0.66 * 1000));


        }

        drawInterval = setInterval(draw, 10)

    }

    image.onload = function () {
        criarMeteoro(15);
    }

    function movimentaMeteoro(meteoro) {
        //ctx.drawImage(image, meteoro.posx, meteoro.posy, meteoro.size, meteoro.size)
        // ctx.clearRect(meteoro.posx, meteoro.posy, meteoro.size, meteoro.size)
        meteoro.posy += meteoro.speed;
        if (meteoro.posy > canvas.height) {
            console.log('meteorosDestruidos')
            //     ctx.drawImage(image, meteoro.posx, meteoro.posy, meteoro.size, meteoro.size)

            // }
            // else{

            clearInterval(meteoro.intervalo);
            let meteoroIndex = meteoros.indexOf(meteoro);
            meteoros.splice(meteoroIndex, 1);
            $('#meteoros-restantes').html(String(meteoros.length).padStart(2, '0'));
            vidaRestante--;
        }

        if (vidaRestante <= 0) {
            gameOver()
        }



    }


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let meteoro of meteoros) {
            ctx.drawImage(image, meteoro.posx, meteoro.posy, meteoro.size, meteoro.size);
        }
    }





    function getMousePos(x, y) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: (x - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (y - rect.top) / (rect.bottom - rect.top) * canvas.height
        }
    }

    function destroiMeteoro(x, y) {
        let mousePos = getMousePos(x, y)
        for (let meteoro of meteoros) {
            if (mousePos.x >= meteoro.posx &&
                mousePos.x <= meteoro.posx + meteoro.size &&
                mousePos.y >= meteoro.posy &&
                mousePos.y <= meteoro.posy + meteoro.size) {
                ctx.clearRect(meteoro.posx, meteoro.posy, meteoro.size, meteoro.size);
                clearInterval(meteoro.intervalo);
                let meteoroIndex = meteoros.indexOf(meteoro);
                meteoros.splice(meteoroIndex, 1);
                $('#meteoros-restantes').html(String(meteoros.length).padStart(2, '0'));
            }
        }

        if (meteoros.length === 0) {
            clearInterval(drawInterval);
            countdown(3)
        }


        function countdown(timer) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.font = '50px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FFFFFF'
            ctx.fillText(timer, canvas.width / 2, canvas.height / 2)
            if (timer === 0) {
                criarMeteoro(++meteorosIniciais)
            }
            else {
                setTimeout(countdown, 1000, --timer)
            }

        }
    }



    this.criarMeteoro = criarMeteoro;
    this.destroiMeteoro = destroiMeteoro;

    function gameOver() {
        for (let meteoro of meteoros) {
            clearInterval(meteoro.intervalo)
            let removeMeteoroIndex = meteoros.indexOf(meteoro);
            meteoros.splice(removeMeteoroIndex, 1);
        }

        clearInterval(drawInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = '50px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2)

    }

}























    // function movimenta(ctx, canvas, meteoro){
    //     ctx.clearRect(meteoro.posx, meteoro.posy, meteoro.size, meteoro.size)
    //     console.log(meteoro.posy)

    //     meteoro.posy = meteoro.posy + meteoro.speed
    //     if (meteoro.posy < canvas.height){
    //         ctx.drawImage(img, meteoro.posx, meteoro.posy, meteoro.size, meteoro.size)
    //     }
    //     else{
    //         clearInterval(meteoro.intervalo);
    //         meteoro.posy = 0
    //     }


