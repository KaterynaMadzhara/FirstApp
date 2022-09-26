import React from 'react';
import './App.css';
import {AddToDo} from "./components/AddToDo";
import {ToDoItem} from "./components/ToDoItem";
import {useTodoContext} from "./context/context";

export const App: React.FC = () => {
    const todos = useTodoContext()
    console.log(todos)

    return (
        <div>
            <header>
                <h1>To Do List</h1>
                <AddToDo/>
            </header>
            <h2>Tasks</h2>
            <p className="empty">{todos.length === 0 ? "No ToDos added" : ""}</p>
            {todos.map(todo => {
                return <ToDoItem todo={todo} key={todo.id}/>
            })}
        </div>
    );
}
export default App;