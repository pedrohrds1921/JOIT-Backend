const { default: knex } = require("knex");

exports.up = knex => knex.schema.alterTable("users",table=>{
    table.string("typeAccount").defaultTo("user")
}) 
  


exports.down = function(knex) {
  
};
