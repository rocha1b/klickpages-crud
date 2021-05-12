import { Request, Response } from "express";
import knex from '../database/connection';

// interface PageSettings {
//   id: number,
//   title: string,
//   description: string,
//   language: string
// }

class PageSettingsController {
  // Show page settings
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const pageSettings = await knex('pageSettings').where('id', id).first();
    if (!pageSettings) {
      return response.status(400).json({ message: "Page settings not found." });
    }

    const serializedPageSettings = {
      ...pageSettings,
    };

    return response.json({ page: serializedPageSettings });
  }

  // Create page settings
  async create(request: Request, response: Response) {
    const { id, title, description, language } = request.body;

    const trx = await knex.transaction();

    const pageSettings = {
      id,
      title,
      description,
      language,
    };

    const insertedIds = await trx('pageSettings').insert(pageSettings);
    const pageSettings_Id = insertedIds[0];

    await trx.commit();
    return response.json({
      id: pageSettings_Id,
      ...pageSettings,
    });
  }  
}