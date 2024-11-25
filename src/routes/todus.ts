import { Router } from "express";

import TodoController from '../controllers/todos';

const route = Router();

route.post('/', TodoController.createTodo);

route.get('/', TodoController.getTodo);

route.patch('/:id', TodoController.updateTodo);

route.delete('/:id', TodoController.deleteTodo);

export default route;