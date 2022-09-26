import React, {useEffect, useState} from 'react';
import './App.css';
import {AddToDo} from "./components/AddToDo";
import {ToDoItem} from "./components/ToDoItem";
import {useTodoContext} from "./context/context";

export const App: React.FC = () => {
    const todosContext = useTodoContext()
    useEffect(() => {
        window.addEventListener('storage', () => {
            console.log("change to local storage!");
            todosContext.setTodos(JSON.parse(localStorage.getItem('TodoList') || '[]'))
        })
    }, [todosContext.setTodos])

    return (
        <div>
            <header>
                <h1>To Do List</h1>
                <AddToDo/>
            </header>
            <h2>Tasks</h2>
            <p className="empty">{todosContext.todoList.length === 0 ? "No ToDos added" : ""}</p>
            {todosContext.todoList.map(todo => {
                return <ToDoItem todo={todo} key={todo.id}/>
            })}
        </div>
    );
}
export default App;