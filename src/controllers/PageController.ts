import { Request, Response } from "express";
import knex from '../database/connection';

// interface Page {
//   id: number,
//   name: string,
//   url: string,
//   isPublished: boolean,
//   settings: settings_id, //PageSettings
//   //tags: pages_tags
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
        settings_id: page.settings_id,
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
    const { name, url, isPublished, settings_id, tags } = request.body;

    const trx = await knex.transaction();

    const page = {
      name,
      url,
      isPublished,
      settings_id,
      tags,
    };

    const insertedIds = await trx('pages').insert(page);
    const page_id = insertedIds[0];

    const pagesTags = page.tags
      .split(',')
      .map((tag: string) => Number(tag.trim()))
      .map((tag_id: number) => {
        return {
          tag_id,
          page_id
        }
      });

    await trx('pages_tags').insert(pagesTags);

    await trx.commit();
    return response.json({
      id: page_id,
      ...page,
    });
  }  
}

export default PageController;