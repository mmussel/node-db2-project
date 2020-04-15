  

exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments()
        tbl.string('VIN', 17).unique().notNullable().index()
        tbl.string('make', 20).notNullable()
        tbl.string('model', 20).notNullable()
        tbl.integer('miles').notNullable()
        tbl.string('transmission', 20)
        tbl.string('title', 15);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
  };