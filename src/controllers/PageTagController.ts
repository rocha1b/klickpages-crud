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

    if (serializedPageTags.length === 0) {
      return response.status(400).json({ message: "There are no page tags." });
    }

    return response.json(serializedPageTags);
  }  
  
  // Show page tag
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const pageTag = await knex('tags').where('id', id).first();
    if (!pageTag) {
      return response.status(400).json({ message: "Tag not found." });
    }

    const serializedPageTag = {
      ...pageTag,
    };

    return response.json({ tag: serializedPageTag });
  }

  // Create page tag
  async create(request: Request, response: Response) {
    const { name } = request.body;

    const trx = await knex.transaction();

    const pageTag = {
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
  
  // Delete tag
  async delete (request: Request, response: Response) {
    const { id } = request.params;
    const tag = await knex('tags').where('id', id).first();

    if (!tag) {
      return response.status(400).json({ message: "Tag does not exist." });
    }

    const trx = await knex.transaction();
    await trx('tags').where('id', id).del();
    await trx.commit();

    return response.json({
      tag: tag,
      message: "Tag deleted successfully",
    });
  }
}

export default PageTagController;