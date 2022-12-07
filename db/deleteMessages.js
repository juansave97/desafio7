const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')
const mensajesApi = new ContenedorArchivo()


const { options } = require('../options/SQLite3.js')
const knex = require('knex')(options)

knex.from('messages').del()
.catch((err) => { 
    console.log(`Error ${err}`)
    throw new Error(`Error al borrar todo: ${err}`)
})