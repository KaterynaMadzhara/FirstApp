import React, {createContext, useContext} from "react";
import {ITodo, IAction} from "../models";
interface TodoContextModel {
    todos: ITodo[],
    dispatch: (action: IAction) => void
};

const TodoContext = createContext<TodoContextModel>({todos:[], dispatch:() => {}});
TodoContext.displayName = "TodoContext";

const useTodoContext = () => useContext(TodoContext);
export {TodoContext, useTodoContext};
export type {TodoContextModel};





