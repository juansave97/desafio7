const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorMemoria()
const mensajesApi = new ContenedorArchivo()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!', Date.now());

    socket.emit('productos', await productosApi.listarAll());
    
    socket.on('update', async producto => {
        productosApi.guardar(producto)

        io.sockets.emit('productos', await productosApi.listarAll());
    })

    socket.emit('mensajes', await mensajesApi.listarAll());
    
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.time = new Date().toLocaleString()

        await mensajesApi.guardar(mensaje)

        io.sockets.emit('mensajes', await mensajesApi.listarAll());
    })

});

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
