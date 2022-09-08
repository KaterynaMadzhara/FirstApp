import React, {useState} from 'react';
import './App.css';
import {AddTask} from "./components/AddTask";
import {ToDoItem} from "./components/ToDoItem";
import {ITodo} from "./models";

export const App: React.FC = () => {
    let todoList = [...JSON.parse(localStorage.getItem('TodoList') || "")]
    const [todos, setTodos] = useState<Array<{ id: number, completed: boolean, title: string }>>(todoList)
    let emptyList = todoList.length === 0 ? "No Tasks added" : ""
    const addTodo = (todo: ITodo) => {
        setTodos([...todos, todo])
        localStorage.setItem('TodoList', JSON.stringify([...todos, todo]))
    }
    const deleteTodo = (todo: ITodo) => {
        const newTodos = todos.filter(todoEl => todo.id !== todoEl.id)
        setTodos(newTodos)
        localStorage.setItem('TodoList', JSON.stringify(newTodos))
    }
    const doneTodo = (todo: ITodo) => {
        const newTodos = todos.map(todoEl => {
            if (todo.id === todoEl.id) {
                todoEl.completed = !todoEl.completed
            }
            return todoEl
        })
        setTodos(newTodos)
        localStorage.setItem('TodoList', JSON.stringify(newTodos))
    }
    const editTodo = (todo: ITodo, value: string) => {
        const newTodos = todos.map(todoEl => {
            if (todo.id === todoEl.id) {
                todoEl.title = value
            }
            return todoEl
        })
        setTodos(newTodos)
        localStorage.setItem('TodoList', JSON.stringify(newTodos))
    }
    return (
        <div>
            <header>
                <h1>To Do List</h1>
                <AddTask addTodo={addTodo}/>
            </header>
            <h2>Tasks</h2>
            <p className="empty">{emptyList}</p>
            {todoList.map(todo => {
                return <ToDoItem todo={todo} key={todo.id} doneTodo={doneTodo} deleteTodo={deleteTodo}
                                 editTodo={editTodo}/>
            })}
        </div>
    );
}
export default App;