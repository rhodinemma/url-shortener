import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // create the tables, columns, ..etc
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.text('password').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    // drop the table, column, ...etc
    await knex.schema.dropTable('users');
}

