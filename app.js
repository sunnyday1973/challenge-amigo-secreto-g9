let amigos = []
const botonAgregar = document.querySelector('#agregarAmigo')
const inputNombreAmigo = document.querySelector('#amigo')
const botonSortear = document.querySelector('#sortearAmigo')


function agregarAmigo() {
    let nombreAmigo = inputNombreAmigo.value.trim()

    if(nombreAmigo === '') {
        alert('Por favor, inserte un nombre.')
        return 
    }else if(amigos.includes(nombreAmigo.toLocaleUpperCase)) {
        alert(`Nombre ${nombreAmigo} ya esta en la lista. Ingrese otro nombre.`)
    } else {
       amigos.push(String(nombreAmigo).toLocaleUpperCase)   
       inputNombreAmigo.value = ''
        actualizarLista()
        if(amigos.length > 2) {
            botonSortear.removeAttribute('disabled')
        }
    }
}

function actualizarLista() {
    let i = 0
    let listaAmigos = document.querySelector('#listaAmigos')
    listaAmigos.innerHTML = ''
    lista = ''
    
    while(i<amigos.length) {
        lista += `<li>${amigos[i]}</li>`
        i++
    }
    
    listaAmigos.innerHTML = lista
    return
}

function sortearAmigo(nombre) {
    resultado = document.querySelector('#resultado')
    if(amigos.length <= 2) {
        alert('Lista solo tiene 2 integrantes. Agregue mas personas, para el sorteo.')
        return
    }
    
    resultado.innerHTML = ''
    botonAgregar.setAttribute('disabled', 'disabled')
    botonAgregar.setAttribute('class', 'button-add')
    let numeroSorteado = Math.floor(Math.random()*amigos.length)+1
    resultado.innerHTML = `El nombre del amigo secreto es ${amigos[numeroSorteado]}`

    return
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
