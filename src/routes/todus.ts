import { Router } from "express";

import { createTodo } from '../controllers/todos';

const route = Router();

route.post('/', createTodo);

route.get('/');

route.patch('/:id');

route.delete('/:id');

export default route;