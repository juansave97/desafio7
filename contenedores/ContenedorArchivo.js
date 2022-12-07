const { options } = require('../options/SQLite3.js')
const knex = require('knex')(options);

class ContenedorArchivo {

    async listar(id) {
        knex.from('messages').where('id', id)
        .then((message) => {
            return message
        })
        .catch((err) => { console.log(`Error ${err}`); throw err })
    }

    async listarAll() {
        try {
            return await knex.from('messages').select('*')
        } catch (error) {
            console.error(`Error ${err}`)
            throw err
        } 
    }

    async guardar(message) {
        try {
            await knex('messages').insert(message)                
    
        } catch (err) {
            console.log(`Error ${err}`);
        }
    }

    async actualizar(elem, id) {
        knex.from('messages').where('id', id).update(elem)
        .then((message) => {
            return message
        })
        .catch((err) => { 
            console.log(`Error ${err}`)
            new Error(`Error al actualizar: no se encontró el id ${id}`)
        })
    }

    async borrar(id) {
        knex.from('messages').where('id', id).del()
        .catch((err) => { 
            console.log(`Error ${err}`)
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        })
    }

    async borrarAll() {
        knex.from('messages').del()
        .catch((err) => { 
            console.log(`Error ${err}`)
            throw new Error(`Error al borrar todo: ${err}`)
        })
    }
}

module.exports = ContenedorArchivo