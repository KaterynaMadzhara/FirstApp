import React, {ChangeEvent, MouseEventHandler, useState} from 'react';
import {ITodo} from "../models";

interface AddTaskProps {
    addTodo: (todo: ITodo) => void
}

export const AddTask: React.FC<AddTaskProps> = ({addTodo}) => {
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<string>("")
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const onClick = (event: any) => {
        event.preventDefault()
        if (!value || !value.trim()) {
            setError("Please, enter valid value")
            return
        }
        addTodo({id: Math.floor(Math.random() * 100), completed: false, title: value})
        setValue("")
        setError("")
    }
    return <div>
        <form id="new-task-form">
            <input type="text"
                   value={value}
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