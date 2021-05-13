import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('pages', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.boolean('isPublished').notNullable();
    table
      .integer('settings_id')
      .notNullable()
      .references('id')
      .inTable('page_settings');
    table.string('tags_id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('pages');
}

