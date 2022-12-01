const { options } = require('../options/mariaDB.js')
const knex = require('knex')(options)

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string(`title`, 30)
    table.float(`price`)
    table.string(`thumbnail`, 255)
})
.then(() => console.log('table created'))
.catch((err) => { console.log(err); throw err })
.finally(() => { knex.destroy() })
