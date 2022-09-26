import React, {createContext, useContext} from "react";
import {ITodo, IAction} from "../models";

const TodoContext = createContext<ITodo[]>([]);
TodoContext.displayName = 'TodoContext';

const TodoDispatchContext = createContext((action:IAction)=>{});
const useTodoContext = () => useContext(TodoContext);
const  useTodoDispatch = () => {
    return useContext(TodoDispatchContext);
}
export {TodoContext, useTodoContext, TodoDispatchContext, useTodoDispatch};





