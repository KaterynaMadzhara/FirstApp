import React, {PropsWithChildren, useEffect, useReducer} from "react";
import {IAction, ITodo} from "../models";
import {TodoContext, TodoContextModel} from "./context";

export const TodoContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        window.addEventListener('storage', () => {
            dispatch({type: "localstorage_changed"});
        })
        return () => {
            window.removeEventListener('storage', () => {
                dispatch({type: "localstorage_changed"});
            })
        };
    }, [])

    const todosReducer = (todos: ITodo[], action: IAction) => {
        switch (action.type) {
            case 'added': {
                return [...todos, {
                    id: action.id,
                    title: action.title,
                    completed: false
                }];
            }
            case 'changed': {
                return todos.map(t => {
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
            }
            case 'deleted': {
                return todos.filter(t => t.id !== action.id);
            }
            case 'localstorage_changed': {
                return JSON.parse(localStorage.getItem('TodoList') || '[]');
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    const initialTodo = JSON.parse(localStorage.getItem('TodoList') || '[]');
    const [todos, dispatch] = useReducer(
        todosReducer,
        initialTodo);
    useEffect(() => {
        localStorage.setItem('TodoList', JSON.stringify(todos));
    }, [todos]);
    const contextValues: TodoContextModel = {
        todos,
        dispatch
    };
    return (
        <TodoContext.Provider value={contextValues}>
            {children}
        </TodoContext.Provider>
    )
}