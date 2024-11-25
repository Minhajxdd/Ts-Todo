import { RequestHandler } from "express";
import { Todo } from "../models/todo";

class TodoController {
    private _TODOS: Todo[] = [];

    createTodo: RequestHandler = (req, res, next) => {
        const text = (req.body as { text: string }).text;
        console.log(text)
        const newTodo = new Todo(Math.random().toString(), text);

        this._TODOS.push(newTodo);

        res.status(201).json({
            status: 'success',
            message: 'Created the todo.',
            createdTodo: newTodo
        });
    };

    getTodo: RequestHandler = (req, res, next) => {
        res.json({
            status: 'success',
            message: 'Fetched all todos',
            todos: this._TODOS
        });
    };

    updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
        const todoId = req.params.id;

        const updatedText = (req.body as { text: string }).text;

        if (!updatedText) {
            res.status(400).json({
                status: 'failed',
                message: 'Text is required to update the todo.'
            });
            return;
        }


        const todoIndex = this._TODOS.findIndex(todo => todo.id === todoId);

        if (todoIndex < 0) {
            res.status(404).json({
                status: 'failed',
                message: `Could't find todo!`
            });
            return;
        };

        this._TODOS[todoIndex] = new Todo(todoId, updatedText);

        res.json({
            status: 'success',
            message: 'Updated todo',
            updatedTodo: this._TODOS[todoIndex]
        });
    };

    deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
        const id = req.params.id;

        const index = this._TODOS.findIndex(todo => todo.id === id);

        if (index < 0) {
            res.status(404).json({
                status: 'failed',
                message: 'could not find todo'
            });
            return;
        };

        this._TODOS.splice(index, 1);

        res.json({
            status: 'success',
            message: 'todo deleted successfully'
        })

    }
};

export default new TodoController();