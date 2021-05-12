import { Knex } from 'knex';

export async function seed(knex: Knex) {
  // await knex('pages').insert([
  //   { id: "0", name: 'Nodejs', isPublished: true },
  //   { id: "1", name: 'React', isPublished: true },
  //   { id: "2", name: 'React Native', isPublished: true },
  //   { id: "3", name: 'Javascript', isPublished: true },
  //   { id: "4", name: 'Express', isPublished: true },
  //   { id: "5", name: 'REST', isPublished: true },
  // ]);

  await knex('page_settings').insert([
    { id: "0", title: 'Português', description: "Página configurada em Português Brasileiro", language: "PT-BR" },
    { id: "1", title: 'English', description: "Page configured in American English", language: "EN-US" },
    { id: "2", title: 'Español', description: "Página configurada en Español Argentino", language: "ES-AR" },
  ])
}