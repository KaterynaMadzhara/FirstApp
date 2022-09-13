import React, {ChangeEvent, FC, PropsWithChildren, useState} from "react";
import {ITodo} from "../models";
import {TodosContextModel, TodoContext} from "./context";

export const TodoContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    let todoList = JSON.parse(localStorage.getItem('TodoList') || '[]')
    const [todos, setTodos] = useState<ITodo[]>(() => todoList)
    const [currentTitle, setCurrentTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [editableTitle, setEditableTitle] = useState<string>("")
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(event.target.value)
    }
    const onClick = (event: any) => {
        event.preventDefault()
        if (!currentTitle || !currentTitle.trim()) {
            setError("Please, enter valid value")
            return
        }
        addTodo({id: Math.floor(Math.random() * 100), completed: false, title: currentTitle})
        setCurrentTitle("")
        setError("")
    }
    const saveToDos = (todos: ITodo[]) => {
        setTodos(todos)
        localStorage.setItem('TodoList', JSON.stringify(todos))
    }
    const addTodo = (todo: ITodo) => {
        const newTodos = [...todos, todo]
        saveToDos(newTodos)
    }
    const deleteTodo = (todoId: number) => {
        const newTodos = todos.filter(todoEl => todoId !== todoEl.id)
        saveToDos(newTodos)
    }
    const doneTodo = (todoId: number) => {
        const newTodos = todos.map(todoEl => {
            let newEl = {...todoEl}
            if (todoId === newEl.id) {
                newEl.completed = !newEl.completed
            }
            return newEl
        })
        saveToDos(newTodos)
    }
    const editTodo = (todoId: number, value: string) => {
        const newTodos = todos.map(todoEl => {
            let newEl = {...todoEl}
            if (todoId === newEl.id) {
                newEl.title = value
            }
            return newEl
        })
        saveToDos(newTodos)
    }
    const onEditClick = (title: string) => {
        setEditableTitle(title)
    }
    const onEditChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(event.target.value)
    }
    const contextValues: TodosContextModel = {
        todos,
        todoList,
        currentTitle,
        error,
        editableTitle,
        setTodos,
        addTodo,
        deleteTodo,
        doneTodo,
        editTodo,
        saveToDos,
        onClick,
        onChange,
        onEditClick,
        onEditChange
    }
    return (
        <TodoContext.Provider value={contextValues}>
            {children}
        </TodoContext.Provider>
    )
}