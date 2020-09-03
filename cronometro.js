export function iniciaCronometro(segundos) {
    let timerId
    segundos--;
    if (segundos === -1) {
        clearTimeout(timerId);

        return false;
    }
    console.log(segundos);
    document.getElementById('cronometro-seg').innerHTML = segundos;
    timerId = setTimeout(iniciaCronometro, 1000, segundos);
}

iniciaCronometro(15)