import React, {useEffect, useRef, useState} from 'react';
import {ITodo} from "../models";

interface TodoProps {
    todo: ITodo
    deleteTodo: (todo: ITodo) => void
    doneTodo: (todo: ITodo) => void
    editTodo: (todo: ITodo, value: string) => void
}

export function ToDoItem(props: TodoProps) {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState<string>(props.todo.title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)
    const onClick = (value: string) => {
        props.editTodo(props.todo, value)
        setEdit(false)
    }
    useEffect(() => {
        if (edit) {
            editTitleInputRef?.current?.focus()
        }
    }, [edit])
    return (
        <div>
            {edit ?
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
                    <input type="checkbox" onChange={() => props.doneTodo(props.todo)}/>
                    <button onClick={() => {
                        setEdit(true)
                    }}>edit
                    </button>
                    <button onClick={() => props.deleteTodo(props.todo)}>delete</button>
                </div>}
        </div>
    )
}
