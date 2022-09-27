import React, {PropsWithChildren, useEffect, useReducer} from "react";
import {IAction, ITodo} from "../models";
import {TodoContext, TodoContextModel} from "./context";

export const TodoContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const TODOS_LOCALSTORAGE_KEY = "TodoList"
    const getLocalstorageTodoList = () => {
        return JSON.parse(localStorage.getItem(TODOS_LOCALSTORAGE_KEY) || "[]")
    };
    useEffect(() => {
        window.addEventListener('storage', () => {
            dispatch({type: "localstorage_changed"});
        })
        return () => {
            window.removeEventListener('storage', () => {
                dispatch({type: "localstorage_changed"});
            })
        };
    }, []);
    const todosReducer = (todos: ITodo[], action: IAction) => {
        switch (action.type) {
            case 'added': {
                return [...todos, {
                    id: Math.floor(Math.random() * 100),
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
                return getLocalstorageTodoList();
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    };
    const [todos, dispatch] = useReducer(
        todosReducer,
        getLocalstorageTodoList());
    useEffect(() => {
        localStorage.setItem(TODOS_LOCALSTORAGE_KEY, JSON.stringify(todos));
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