import React, {useEffect, useRef, useState} from 'react';
import {ITodo} from "../models";

interface TodoProps {
    todo: ITodo
    deleteTodo: (todoId: number) => void
    doneTodo: (todoId: number) => void
    editTodo: (todoId: number, value: string) => void
}

export function ToDoItem(props: TodoProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState<string>(props.todo.title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)
    const onClick = (value: string) => {
        props.editTodo(props.todo.id, value)
        setIsEditing(false)
    }
    useEffect(() => {
        if (isEditing) {
            editTitleInputRef?.current?.focus()
        }
    }, [isEditing])
    return (
        <div>
            {isEditing ?
                <div className="task">
                    <input className="text"
                           id="edit-text"
                           value={value}
                           ref={editTitleInputRef}
                           onChange={(e) => {
                               setValue(e.target.value)
                           }}/>
                    <button onClick={() => onClick(value)}>save</button>
                </div>
                :
                <div className="task">
                    <input className="text"
                           style={{textDecoration: props.todo.completed ? 'line-through' : 'none'}}
                           value={props.todo.title}
                           readOnly/>
                    <input type="checkbox" onChange={() => props.doneTodo(props.todo.id)}/>
                    <button onClick={() => {
                        setIsEditing(true)
                    }}>edit
                    </button>
                    <button onClick={() => props.deleteTodo(props.todo.id)}>delete</button>
                </div>}
        </div>
    )
}
