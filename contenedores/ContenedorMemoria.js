const { options } = require('../options/mariaDB.js')
const knex = require('knex')(options);

class ContenedorMemoria {
    listar(id) {
        knex.from('products').where('id', id)
        .then((product) => {
            return product
        })
        .catch((err) => { console.log(`Error ${err}`); throw err })
    }

    async listarAll() {
        try {
            return await knex.from('products').select('*') 
        } catch (error) {
            console.error(`Error ${err}`)
            throw err
        }       
    }

    async guardar(product) {
        try {
            await knex('products').insert(product)                    
        } catch (err) {
            console.log(`Error ${err}`);
        }
    }

    actualizar(elem, id) {
        knex.from('products').where('id', id).update(elem)
        .then((product) => {
            return product
        })
        .catch((err) => { 
            console.log(`Error ${err}`)
            new Error(`Error al actualizar: no se encontró el id ${id}`)
        })
    }

    borrar(id) {
        knex.from('prodcts').where('id', id).del()
        .catch((err) => { 
            console.log(`Error ${err}`)
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        })
    }

    borrarAll() {
        knex.from('products').del()
        .catch((err) => { 
            console.log(`Error ${err}`)
            throw new Error(`Error al borrar todo: ${err}`)
        })
    }
}

module.exports = ContenedorMemoria
