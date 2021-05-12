import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable('pages_tags', (table) => {
    table.increments('id').primary();
        table.integer('page_id')
            .notNullable()
            .references('id')
            .inTable('pages');

        table.integer('tag_id')
            .notNullable()
            .references('id')
            .inTable('tags');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('pages_tags');
}

