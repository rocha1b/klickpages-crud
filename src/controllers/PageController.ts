import { Request, Response } from "express";
import knex from '../database/connection';

// interface Page {
//   id: number,
//   name: string,
//   url: string,
//   isPublished: boolean,
//   settings: PageConfig,
//   tags: PageTag[],
// }

class PageController {
  // List all pages
  async index(request: Request, response: Response) {
    const pages = await knex('pages').select('*');

    const serializedPages = pages.map((page) => {
      return {
        id: page.id,
        name: page.name,
        url: page.url,
        isPublished: page.isPublished,
        settings: page.settingsId,
        tags: page.tags,
      };
    });

    return response.json(serializedPages);
  }
  
  // Show page
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const page = await knex('pages').where('id', id).first();
    if (!page) {
      return response.status(400).json({ message: "Page not found." });
    }

    const serializedPage = {
      ...page,
    };

    return response.json({ page: serializedPage });
  }

  // Create page
  async create(request: Request, response: Response) {
    const { id, name, url, isPublished, settings, tags } = request.body;

    const trx = await knex.transaction();

    const page = {
      id,
      name,
      url,
      isPublished,
      settings,
      tags,
    };

    const insertedIds = await trx('pages').insert(page);
    const page_Id = insertedIds[0];

    await trx.commit();
    return response.json({
      id: page_Id,
      ...page,
    });
  }  
}

export default PageController;