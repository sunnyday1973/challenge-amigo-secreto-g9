let amigos = []
let amigosSorteados = []
const botonAgregar = document.querySelector('#agregarAmigo')
const inputNombreAmigo = document.querySelector('#amigo')
const botonSortear = document.querySelector('#sortearAmigo')


function agregarAmigo() {
    let nombreAmigo = inputNombreAmigo.value.trim()

    if(nombreAmigo === '') {
        alert('Por favor, inserte un nombre.')
        return 
    }else if(amigos.includes(nombreAmigo.toLocaleUpperCase())) {
        alert(`Nombre ${nombreAmigo} ya esta en la lista. Ingrese otro nombre.`)
    } else {
       amigos.push(String(nombreAmigo).toLocaleUpperCase())   
       inputNombreAmigo.value = ''
        actualizarLista('listaAmigos',amigos)
        if(amigos.length > 2) {
            botonSortear.removeAttribute('disabled')
        }
    }
}

function actualizarLista(idLista, listaAmigos) {
    let htmlAmigos = document.querySelector(`#${idLista}`)
    htmlAmigos.innerHTML = ''
    let lista = ''
    
    for (let i = 0; i < listaAmigos.length; i++) {
        lista += `<li>${listaAmigos[i]}`;
    }
    
    htmlAmigos.innerHTML = lista
    return
}

function sortearAmigo(nombre) {
    resultado = document.querySelector('#resultado')

    if(amigos.length <= 2) {
        alert('Lista solo tiene 2 integrantes. Agregue mas personas, para el sorteo.')
        return false
    }
    
    botonAgregar.setAttribute('disabled', 'disabled')
    botonAgregar.setAttribute('class', 'button-add')
    let numeroSorteado = Math.floor(Math.random()*amigos.length)+1
    resultado.innerHTML += `El nombre del amigo secreto es ${amigos[numeroSorteado]}<br/>`
    amigosSorteados.push(numeroSorteado)
    actualizarLista('listaAmigos',amigos)
    
    if ((amigos.length - amigosSorteados) < 2) {
        document.querySelector('#sortearAmigo').setAttribute('disabled', 'disabled');
        amigos.some(amigo => amigosSorteados.includes(amigo.toUpperCase()))
        resultado.innerHTML = `<strong>El nombre del amigo secreto sin sortear es ${amigos.filter((_, index) => !amigosSorteados.includes(index))}</strong><br/>`
        + resultado.innerHTML
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
