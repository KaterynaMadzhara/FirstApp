import React from "react";
import "./App.css";
import {AddTodo} from "./components/AddTodo";
import {TodoItem} from "./components/TodoItem";
import {useTodoContext} from "./context/context";

export const App: React.FC = () => {
    const {todos} = useTodoContext();

    return (
        <div>
            <header>
                <h1>To Do List</h1>
                <AddTodo/>
            </header>
            <h2>Tasks</h2>
            <p className="empty">{todos.length === 0 ? "No Todos added" : ""}</p>
            {todos.map(todo => {
                return <TodoItem todo={todo} key={todo.id}/>
            })}
        </div>
    );
}
export default App;