# klickpages-crud
Aplicação CRUD desenvolvida para teste técnico da Klickpages

## Setup application

1. Clone this repository with `git clone https://github.com/rocha1b/klickpages-crud.git`
2. Inside `server` folder run `yarn install` to install all dependencies
3. Then run `yarn knex migrate:latest` to setup SQLite database
4. Run `yarn knex seed:run` to seed the database
5. Finally, run `yarn dev` to start server application on port 3000

## Endpoints

This application works with a RESTful API, you can get [Postman Collection through here](https://www.getpostman.com/collections/28955e8b54555bc6a45d).
Or import `https://www.getpostman.com/collections/28955e8b54555bc6a45d` into your API interface software