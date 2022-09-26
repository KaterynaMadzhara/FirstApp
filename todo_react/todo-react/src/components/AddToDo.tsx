import React from 'react';
import {useTodoContext} from "../context/context";


export const AddToDo: React.FC = () => {
    const todosContext = useTodoContext()
    return <div>
        <form id="new-task-form">
            <input type="text"
                   value={todosContext.currentTitle}
                   onChange={todosContext.onChange}
                   placeholder="What do you want to do?"
                   id="new-task-input"
            />
            <button type="submit" onClick={todosContext.onClick} id="new-task-submit">
                Add task
            </button>
        </form>
        <p className="error">{todosContext.error}</p>
    </div>
}