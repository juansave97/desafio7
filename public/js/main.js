const socket = io.connect();

const formAgregarProducto = document.getElementById('formAgregarProducto')
const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')
const formPublicarMensaje = document.getElementById('formPublicarMensaje')


formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }

    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { email: inputUsername.value, text: inputMensaje.value }

    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', async mensajes => {
    const html = makeHtmlList(mensajes)
    
    document.getElementById('mensajes').innerHTML = html
 })

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.email}</b>
                [<span style="color:brown;">${mensaje.time}</span>] :
                <i style="color:green;">${mensaje.text}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
