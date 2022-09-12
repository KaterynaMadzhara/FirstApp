import React from "react";
import {ITodo} from "./models";
interface TodosContextModel {
    todos: ITodo[], deleteTodo: (todoId: number) => void
    doneTodo: (todoId: number) => void
    editTodo: (todoId: number, value: string)  => void
}
export const TodosContext = React.createContext<TodosContextModel>({
    todos:[],
    deleteTodo: () => {},
    doneTodo: () => {},
    editTodo:  () => {}
})