/**
* TodosStore.tsx
* Copyright: Microsoft 2017
*
* Resub Basic Example https://github.com/Microsoft/ReSub
*/

import * as _ from 'lodash';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import LocalDb from '../app/LocalDb';
import { Todo } from '../models/TodoModels';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = [];

    startup() {
        return LocalDb.getAllTodos().then(todos => {
            this._todos = todos;
        });
    }

    addTodo(tod: Todo) {
        this._todos = this._todos.concat(tod);

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return tod;
    }

    setTodos(tod: Todo[]) {
        this._todos = tod

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return this._todos;
    }

    @autoSubscribe
    getTodos() {
        return this._todos;
    }

    @autoSubscribe
    getTodoById(todoId: string) {
        return _.find(this._todos, todo => todo.token_id.toString() === todoId);
    }

    deleteTodo(todoId: string) {
        this._todos = _.filter(this._todos, todo => todo.token_id.toString() !== todoId);

        // Asynchronously delete the todo item from the DB.
        LocalDb.deleteTodo(todoId);
        this.trigger();
    }
}

export default new TodosStore();
