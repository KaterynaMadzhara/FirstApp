import React, {ChangeEvent, useState} from 'react';
import {useTodoDispatch} from "../context/context";


export const AddToDo: React.FC = () => {
    let dispatch = useTodoDispatch()
    const [currentTitle, setCurrentTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(event.target.value)
    }
    const onClick = (event: any) => {
        event.preventDefault()
        if (!currentTitle || !currentTitle.trim()) {
            setError("Please, enter valid value")
            return
        }
        dispatch({type:"added", id: Math.floor(Math.random() * 100), completed: false, title: currentTitle})
        setCurrentTitle("")
        setError("")
    }
    return <div>
        <form id="new-task-form">
            <input type="text"
                   value={currentTitle}
                   onChange={onChange}
                   placeholder="What do you want to do?"
                   id="new-task-input"
            />
            <button type="submit" onClick={onClick} id="new-task-submit">
                Add task
            </button>
        </form>
        <p className="error">{error}</p>
    </div>
}