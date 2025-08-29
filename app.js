let amigos = []
let amigosSorteados = []
let sorteoInicio = false
let sorteoFinalizo = false
const botonAgregar = document.querySelector('#agregarAmigo')
const inputNombreAmigo = document.querySelector('#amigo')
const botonSortear = document.querySelector('#sortearAmigo')


function agregarAmigo() {
    let nombreAmigo = inputNombreAmigo.value.trim()

    if(sorteoInicio || sorteoFinalizo) {
        alert(`El sorteo ya ha ${sorteoInicio ? 'iniciado':'finalizado'}. Renicia el juego, para poder agregar mas integrantes.`)
        return false
    }

    if(nombreAmigo === '') {
        console.log('nombre vacio')
        alert('Por favor, inserte un nombre.')
        return false
    }else {
        nombreAmigo = String(nombreAmigo).toLocaleUpperCase();

        if(amigos.includes(nombreAmigo)) {
            console.log('ingrese otro')
            alert(`Nombre ${nombreAmigo} ya esta en la lista. Ingrese otro nombre.`)
            return false
        } else {
            amigos.push(nombreAmigo)   
            inputNombreAmigo.value = ''
            inputNombreAmigo.focus()
            actualizarLista('listaAmigos',amigos, sorteoInicio)
            if(amigos.length >= 2) {
                botonSortear.setAttribute('class', 'button-draw')                
            }
        }
    }

    return true
}

function actualizarLista(idLista, amigos, sorteoInicio=false) {
    let htmlAmigos = document.querySelector(`#${idLista}`)
    htmlAmigos.innerHTML = ''
    let lista = ''
    let marcado = ''

    for (let i = 0; i < amigos.length; i++) {
        marcado = (sorteoInicio && amigosSorteados.includes(i)) ? '<img src="assets/check.png" alt="Ícono para marcardo"/>&nbsp;':''
        lista += `<li>${marcado}${amigos[i]}</li>`;
    }
    
    htmlAmigos.innerHTML = lista
    return true
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
    
    sorteoInicio = true
    let numeroSorteado = generaNumero()
    console.log(`numeroSorteado: ${numeroSorteado}, amigos[${numeroSorteado}]`)

    if(numeroSorteado != null) {
        amigosSorteados.push(numeroSorteado)
    }

    botonAgregar.setAttribute('class', 'button-add-disabled')
    resultado.innerHTML = `El nombre del amigo secreto es ${amigos[numeroSorteado]}<br/>`
    actualizarLista('listaAmigos',amigos,sorteoInicio)

    if(amigos.length == amigosSorteados.length) {
        botonSortear.setAttribute('class', 'button-draw-disabled')
        sorteoFinalizo = true
        setTimeout(() => {
            alert('Se han sorteado todos los amigos. Reinicia el juego, si desea hacer otro sorteo.')
        }, 2000); // 2000 milisegundos = 2 segundos
        return false
   }

    return true
}

function resetearJuego() {
    botonAgregar.removeAttribute('disabled')
    botonAgregar.setAttribute('class', 'button-add')
    botonSortear.setAttribute('class', 'button-draw-disabled')
    document.querySelector('#listaAmigos').innerHTML = ''
    document.querySelector('#resultado').innerHTML = ''
    sorteoInicio = false
    sorteoFinalizo = false
    amigos = []
    amigosSorteados = []

    return true
}

function generaNumero() {
    let numero = Math.floor(Math.random()*amigos.length)
    console.log(`sorteado:${numero}`)

    if(amigosSorteados.includes(numero)) {
        console.log('recursia')
        generaNumero()
    }
    
    return numero
}
