const { default: knex } = require("knex");

exports.up = knex=> knex.schema.createTable("notes",table=>{
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.timestamp('created_at', { useTz: true,}).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true,}).defaultTo(knex.fn.now())
})
;



exports.down = knex=> {}
