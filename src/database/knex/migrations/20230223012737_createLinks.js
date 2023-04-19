const { default: knex } = require("knex");

exports.up = knex=> knex.schema.createTable("links",table=>{
    table.increments("id");
    table.text("url").notNullable();
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp('created_at',{ useTz: true,}).defaultTo(knex.fn.now());
})
;


exports.down = function(knex) {
  
};
