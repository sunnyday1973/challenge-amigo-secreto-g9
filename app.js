let amigos = []


function agregarAmigo() {
    let inputNombreAmigo = document.querySelector('#amigo')
    let nombreAmigo = inputNombreAmigo.value

    if(nombreAmigo === '') {
        alert('Por favor, inserte un nombre.')
        return 
    }else if(amigos.includes(nombreAmigo)) {
        alert(`Nombre ${nombreAmigo} ya esta en la lista. Ingrese otro nombre.`)
    } else {
       amigos.push(nombreAmigo)   
       inputNombreAmigo.value = ''
        actualizarLista()
        if(amigos.length > 2) {
            document.querySelector('#sortearAmigo').setAttribute('disabled', '')
        }
    }
}

function actualizarLista() {
    let i = 0
    let listaAmigos = document.querySelector('#listaAmigos')
    listaAmigos.innerHTML('')
    lista = ''
    
    while(i<amigos.length) {
        lista += `<li>${amigos[i]}</li>`
        i++
    }
    
    listaAmigos.innerHTML(lista)
    return
}

function sortearAmigo(nombre) {
    resultado = document.querySelector('#resultado')
    if(amigos.length <= 2) {
        alert('Lista solo tiene 2 integrantes. Agregue mas personas, para el sorteo.')
        return
    }
    
    resultado.innerHTML('')
    document.querySelector('#agregarAmigo').setAttribute('disabled', 'disabled')
    let numeroSorteado = Math.floor(Math.random()*amigos.length)+1
    resultado.innerHTML(`El nombre del amigo secreto es ${amigos[numeroSorteado]}`)
    return
}

function resetearJuego() {
    document.querySelector('#agregarAmigo').setAttribute('disabled', '')
    document.querySelector('#sortearAmigo').setAttribute('disabled', 'disabled')
    document.querySelector('#listaAmigos').innerHTML('')
    return
}

