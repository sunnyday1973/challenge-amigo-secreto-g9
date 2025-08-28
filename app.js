let amigos = []
let amigosSorteados = []
const botonAgregar = document.querySelector('#agregarAmigo')
const inputNombreAmigo = document.querySelector('#amigo')
const botonSortear = document.querySelector('#sortearAmigo')


function agregarAmigo() {
    let nombreAmigo = inputNombreAmigo.value.trim()

    if(nombreAmigo === '') {
        console.log('nombre vacio')
        alert('Por favor, inserte un nombre.')
        return 
    }else {
        nombreAmigo = String(nombreAmigo).toLocaleUpperCase();
        if(amigos.includes(nombreAmigo)) {
            console.log('ingrese otro')
            alert(`Nombre ${nombreAmigo} ya esta en la lista. Ingrese otro nombre.`)
            return
        } else {
            amigos.push(nombreAmigo)   
            inputNombreAmigo.value = ''
            actualizarLista('listaAmigos',amigos)
            if(amigos.length > 2) {
                botonSortear.removeAttribute('disabled')
            }
        }
    }
    return
}

function actualizarLista(idLista, amigos, sorteado=false) {
    let htmlAmigos = document.querySelector(`#${idLista}`)
    htmlAmigos.innerHTML = ''
    let lista = ''
    let marcado = ''
    
    for (let i = 0; i < amigos.length; i++) {
        marcado = (sorteado && amigosSorteados.includes(i)) ? '<img src="assets/check.png" alt="Ícono para marcardo">':''
        lista += `<li>${marcado}${amigos[i]}</li>`;
    }
    
    htmlAmigos.innerHTML = lista
    return
}

function sortearAmigo() {
    resultado = document.querySelector('#resultado')

    if(!amigos.length) {
        alert('Debe ingresar a lo menos 2 integrantes, para empezar el sorteo.')
        return false
    }
    if(amigos.length < 2) {
        console.log('2 o menos integrantes')
        alert('Lista solo tiene 1 integrante. Agregue mas personas, para el sorteo.')
        return false
    }
    
    botonAgregar.setAttribute('disabled', 'disabled')
    botonAgregar.setAttribute('class', 'button-add')
    let numeroSorteado = Math.floor(Math.random()*amigos.length)
    resultado.innerHTML = `El nombre del amigo secreto es ${amigos[numeroSorteado]}<br/>`
    amigosSorteados.push(numeroSorteado)
    actualizarLista('listaAmigos',amigos,true)
    
    if ((amigos.length - amigosSorteados.length) < 2) {
        console.log('quedo 1')
        botonSortear.setAttribute('disabled', 'disabled');
        botonSortear.setAttribute('style', 'color:var(--color-tertiario)')
    }
}

function resetearJuego() {
    botonAgregar.removeAttribute('disabled')
    botonAgregar.setAttribute('class', 'button-add')
    botonSortear.removeAttribute('disabled')
    botonSortear.setAttribute('class', 'button-draw')
    document.querySelector('#listaAmigos').innerHTML = ''
    document.querySelector('#resultado').innerHTML = ''

    amigos = []

    return
}
