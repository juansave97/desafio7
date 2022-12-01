const { options } = require('../options/SQLite3.js')
const knex = require('knex')(options)

knex.schema.createTable('messages', table => {
    table.increments('id')
    table.string(`text`, 500)
    table.string(`email`, 30)
    table.string(`time`, 10)
})
.then(() => console.log('table created'))
.catch((err) => { console.log(err); throw err })
.finally(() => { knex.destroy() })
