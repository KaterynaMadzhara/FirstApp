import React, {PropsWithChildren, useEffect, useReducer, useState} from "react";
import {IAction, ITodo} from "../models";
import {TodoDispatchContext, TodoContext} from "./context";

export const TodoContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("change to local storage!");
            dispatch({type: "localstorage_changed",title:""})
        })
    }, [])

    const saveToDos = (todos: ITodo[]) => {
        localStorage.setItem('TodoList', JSON.stringify(todos))
    }

    const tasksReducer = (todos: ITodo[], action: IAction) => {
        switch (action.type) {
            case 'added': {
                let newTodos = [...todos, {
                    id: action.id,
                    title: action.title,
                    completed: false
                }];
                saveToDos(newTodos);
                return newTodos;
            }
            case 'changed': {
                let newTodos = todos.map(t => {
                    if (t.id === action.id) {
                        return {
                            id: action.id,
                            completed: action.completed,
                            title: action.title
                        };
                    } else {
                        return t;
                    }
                });
                saveToDos(newTodos)
                return newTodos;
            }
            case 'deleted': {
                let newTodos = todos.filter(t => t.id !== action.id);
                saveToDos(newTodos)
                return newTodos;
            }
            case 'localstorage_changed': {
                return JSON.parse(localStorage.getItem('TodoList') || '[]');
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    const initialTodo = JSON.parse(localStorage.getItem('TodoList') || '[]')
    const [todos, dispatch] = useReducer(
        tasksReducer,
        initialTodo);

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    )
}