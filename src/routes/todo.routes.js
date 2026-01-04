import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { TodoController } from '../controller/todo.controller.js';

const routes = express.Router();
const controller = new TodoController();

routes.use(AuthMiddleware);

// Correct routing
routes.get('/', AuthMiddleware, controller.getAllTodos);
routes.get('/:id', AuthMiddleware, controller.getTodoById);
routes.post('/', AuthMiddleware, controller.create);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);

export default routes;
