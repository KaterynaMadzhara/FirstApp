import React, {useState} from 'react';
import './App.css';
import {AddToDo} from "./components/AddToDo";
import {ToDoItem} from "./components/ToDoItem";
import {ITodo} from "./models";
import {TodosContext} from "./context"

export const App: React.FC = () => {
    let todoList = [...JSON.parse(localStorage.getItem('TodoList') || "")]
    const [todos, setTodos] = useState<ITodo[]>(todoList)
    const saveToLocalStorage = (todos: ITodo[]) => {
        localStorage.setItem('TodoList', JSON.stringify(todos))
    }
    const addTodo = (todo: ITodo) => {
        const newTodos = [...todos, todo]
        setTodos(newTodos)
        saveToLocalStorage(newTodos)
    }
    const deleteTodo = (todoId: number) => {
        const newTodos = todos.filter(todoEl => todoId !== todoEl.id)
        setTodos(newTodos)
        saveToLocalStorage(newTodos)
    }
    const doneTodo = (todoId: number) => {
        const newTodos = todos.map(todoEl => {
            if (todoId === todoEl.id) {
                todoEl.completed = !todoEl.completed
            }
            return todoEl
        })
        setTodos(newTodos)
        saveToLocalStorage(newTodos)
    }
    const editTodo = (todoId: number, value: string) => {
        const newTodos = todos.map(todoEl => {
            if (todoId === todoEl.id) {
                todoEl.title = value
            }
            return todoEl
        })
        setTodos(newTodos)
        saveToLocalStorage(newTodos)
    }
    return (
        <div>
            <header>
                <h1>To Do List</h1>
                <AddToDo addTodo={addTodo}/>
            </header>
            <h2>Tasks</h2>
            <p className="empty">{todoList.length === 0 ? "No ToDos added" : ""}</p>
            {todoList.map(todo => {
                return <TodosContext.Provider value={{todos, deleteTodo, doneTodo, editTodo}}>
                <ToDoItem todo={todo} key={todo.id}/>
                </TodosContext.Provider>
            })}
        </div>
    );
}
export default App;