import React, {ChangeEvent, useContext} from "react";
import {ITodo} from "../models";

interface TodosContextModel {
    todos: ITodo[],
    todoList: ITodo[],
    currentTitle: string,
    error: string,
    editableTitle: string,
    setTodos: (todos: ITodo[]) => void
    addTodo: (todo: ITodo) => void
    deleteTodo: (todoId: number) => void
    doneTodo: (todoId: number) => void
    editTodo: (todoId: number, value: string) => void
    saveToDos: (todos: ITodo[]) => void
    onClick: (event: any) => void
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onEditClick: (title: string) => void
    onEditChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TodosContextDefault: TodosContextModel = {
    todos: [],
    todoList: [],
    currentTitle: "",
    error: "",
    editableTitle: "",
    setTodos:() => {},
    addTodo: () => {},
    deleteTodo: () => {},
    doneTodo: () => {},
    editTodo: () => {},
    saveToDos: () => {},
    onClick: () => {},
    onChange: () => {},
    onEditClick: () => {},
    onEditChange: () => {}
}

const TodoContext = React.createContext<TodosContextModel>(TodosContextDefault);
TodoContext.displayName = 'TodoContext';

const useTodoContext = () => useContext(TodoContext);

export {TodoContext, useTodoContext};
export type {TodosContextModel};
