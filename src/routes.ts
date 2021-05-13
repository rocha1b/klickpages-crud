import express from 'express';
import PageController from './controllers/PageController';
import PageSettingsController from './controllers/PageSettingsController';
import PageTagController from './controllers/PageTagController';

const routes = express.Router();

const pageController = new PageController();
const pageSettingsController = new PageSettingsController();
const pageTagController = new PageTagController();

routes.get('/pages', pageController.index); // list all pages
routes.get('/pages/:id', pageController.show); // show page
routes.post('/pages', pageController.create); // create page
routes.delete('/pages/:id', pageController.delete); // delete page
routes.put('/pages/:id', pageController.update); // edit page

routes.get('/settings', pageSettingsController.index); // list all settings
routes.get('/settings/:id', pageSettingsController.show); // show setting
routes.post('/settings', pageSettingsController.create); // create setting
routes.delete('/settings/:id', pageSettingsController.delete); // delete setting
routes.put('/settings/:id', pageSettingsController.update); // edit setting

routes.get('/tags', pageTagController.index); // list all tags
routes.get('/tags/:id', pageTagController.show); // show tag
routes.post('/tags', pageTagController.create); // create tag
routes.delete('/tags/:id', pageTagController.delete); // delete tag

export default routes;