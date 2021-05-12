import { Request, Response } from "express";
import knex from '../database/connection';

// interface PageTag {
//   id: number,
//   name: string,
// }

class PageTagController {
  // Show page tag
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const pageTag = await knex('pageTags').where('id', id).first();
    if (!pageTag) {
      return response.status(400).json({ message: "Page tag not found." });
    }

    const serializedPageTag = {
      ...pageTag,
    };

    return response.json({ page: serializedPageTag });
  }

  // Create page tag
  async create(request: Request, response: Response) {
    const { id, name } = request.body;

    const trx = await knex.transaction();

    const pageTag = {
      id,
      name,
    };

    const insertedIds = await trx('pageTags').insert(pageTag);
    const pageTag_Id = insertedIds[0];

    await trx.commit();
    return response.json({
      id: pageTag_Id,
      ...pageTag,
    });
  }  
}