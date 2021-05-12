import { Request, Response } from "express";
import knex from '../database/connection';

// interface PageTag {
//   id: number,
//   name: string,
// }

class PageTagController {
  // List all tags
  async index(request: Request, response: Response) {
    const pageTags = await knex('tags').select('*');

    const serializedPageTags = pageTags.map((pageTags) => {
      return {
        id: pageTags.id,
        name: pageTags.name,
      };
    });

    return response.json(serializedPageTags);
  }  
  
  // Show page tag
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const pageTag = await knex('tags').where('id', id).first();
    if (!pageTag) {
      return response.status(400).json({ message: "Page tag not found." });
    }

    const serializedPageTag = {
      ...pageTag,
    };

    return response.json({ tag: serializedPageTag });
  }

  // Create page tag
  async create(request: Request, response: Response) {
    const { id, name } = request.body;

    const trx = await knex.transaction();

    const pageTag = {
      id,
      name,
    };

    const insertedIds = await trx('tags').insert(pageTag);
    const pageTag_Id = insertedIds[0];

    await trx.commit();
    return response.json({
      id: pageTag_Id,
      ...pageTag,
    });
  }  
}

export default PageTagController;