import express from 'express';
import routes from './routes';

import './database';

/* Sucrase permite utilizar o 'import' ao invés do 'const' para importar as dependências */

/* constructor = método que é chamado automaticamente quando a classe é instanciada. Quando a classe é chamada */
class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
