import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable('page_settings', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('language').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('page_settings');
}

