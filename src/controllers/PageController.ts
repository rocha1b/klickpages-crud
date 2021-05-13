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
        isPublished: page.isPublished == 1 ? "true" : "false",
        settings_id: page.settings_id,
        tags_id: page.tags_id,
      };
    });

    if (serializedPages.length === 0) {
      return response.status(400).json({ message: "There were no pages found on the database." });
    }

    return response.json(serializedPages);
  }
  
  // Show page
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const page = await knex('pages').where('id', id).first();
    if (!page) {
      return response.status(400).json({ message: "Page not found." });
    }

    const pageSetting = await knex('page_settings')
    .where('id', page.settings_id)
    .first();

    const tags = await knex('tags')
    .join('pages_tags', 'tags.id', '=', 'pages_tags.tag_id')
    .where('pages_tags.page_id', id)
    .select('tags.id', 'tags.name');

    const serializedPage = {
      id: page.id,
      name: page.name,
      url: page.url,
      isPublished: page.isPublished == 1 ? "true" : "false",
      pageSetting,
      tags,
    };

    return response.json({ page: serializedPage });
  }

  // Create page
	async create(request: Request, response: Response) {
		const { name, url, isPublished, settings_id, tags_id } = request.body;

		const trx = await knex.transaction();

		const page = {
			name,
			url,
			isPublished,
			settings_id,
			tags_id,
		};

		const insertedIds = await trx('pages').insert(page);
		const page_id = insertedIds[0];

		const pagesTags = page.tags_id
			.split(',')
			.map((tag: string) => Number(tag.trim()))
			.map((tag_id: number) => {
				return {
					tag_id,
					page_id,
				};
			});

		await trx('pages_tags').insert(pagesTags);

		await trx.commit();
		return response.json({
			id: page_id,
			...page,
		});
	}

  // Delete page
  async delete (request: Request, response: Response) {
    const { id } = request.params;
    const page = await knex('pages').where('id', id).first();
    // const pageName = page.name;

    if (!page) {
      return response.status(400).json({ message: "Page does not exist." });
    }

    const trx = await knex.transaction();
    await trx('pages').where('id', id).del();
    await trx.commit();

    return response.json({
      page: page,
      message: "Page deleted successfully",
    });
  }

  // Update page
  async update (request: Request, response: Response) {
    const { id } = request.params;
    const { name, url, isPublished, settings_id, tags_id } = request.body;

    const page = await knex('pages').where('id', id).first();
    if (!page) {
      return response.status(400).json({ message: "Page does not exist." });
    }
    
    // Reatribuindo valores da page
    page.name = name;
    page.url = url;
    page.isPublished = isPublished;
    page.settings_id = settings_id;
    page.tags_id = tags_id;
    
    const trx = await knex.transaction();
    await trx('pages').where('id', id).update(page);
    await trx('pages_tags').where('page_id', id).del();

    const pagesTags = page.tags_id
    .split(',')
    .map((tag: string) => Number(tag.trim()))
    .map((tag_id: number) => {
      return {
        tag_id,
        page_id: page.id,
      };
    });

    await trx('pages_tags').insert(pagesTags);
    await trx.commit();

    return response.json({
      page: page,
      message: "Page updated successfuly",
    });
  }
}

export default PageController;