import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('tags').insert([
    { id: "1", name: 'Javascript' },
    { id: "2", name: 'NodeJS' },
    { id: "3", name: 'React' },
  ])
}