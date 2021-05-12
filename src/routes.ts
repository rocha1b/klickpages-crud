import express, { request, response } from 'express';
import { Router } from 'express';

import PageController from './controllers/PageController';

const routes = express.Router();

const pagesController = new PageController();

routes.get('/pages', pagesController.index); // list all pages
routes.get('/pages/:id', pagesController.show); // show page
routes.post('/pages', pagesController.create); // create page

export default routes;
