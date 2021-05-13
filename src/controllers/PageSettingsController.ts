import { Request, Response } from "express";
import knex from '../database/connection';

// interface PageSettings {
//   id: number,
//   title: string,
//   description: string,
//   language: string
// }

class PageSettingsController {
  // List all settings
  async index(request: Request, response: Response) {
    const pageSettings = await knex('page_settings').select('*');

    const serializedPageSettings = pageSettings.map((pageSettings) => {
      return {
        id: pageSettings.id,
        title: pageSettings.title,
        description: pageSettings.description,
        language: pageSettings.language,
      };
    });

    if (serializedPageSettings.length === 0) {
      return response.status(400).json({ message: "There are no page settings." });
    }

    return response.json(serializedPageSettings);
  }  
  
  // Show page settings
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const pageSettings = await knex('page_settings').where('id', id).first();
    if (!pageSettings) {
      return response.status(400).json({ message: "Page settings not found." });
    }

    const serializedPageSettings = {
      ...pageSettings,
    };

    return response.json({ page_settings: serializedPageSettings });
  }

  // Create page settings
  async create(request: Request, response: Response) {
    const { title, description, language } = request.body;

    const trx = await knex.transaction();

    const pageSettings = {
      title,
      description,
      language,
    };

    const insertedIds = await trx('page_settings').insert(pageSettings);
    const pageSettings_Id = insertedIds[0];

    await trx.commit();
    return response.json({
      id: pageSettings_Id,
      ...pageSettings,
    });
  }  
}

export default PageSettingsController;