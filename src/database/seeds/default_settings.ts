import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('page_settings').insert([
    { id: "1", title: 'Português', description: "Página configurada em Português Brasileiro", language: "PT-BR" },
    { id: "2", title: 'English', description: "Page configured in American English", language: "EN-US" },
    { id: "3", title: 'Español', description: "Página configurada en Español Argentino", language: "ES-AR" },
  ])
}