import React, {useContext, useEffect, useRef, useState} from 'react';
import {ITodo} from "../models";
import {TodosContext} from "../context"
interface TodoProps {
    todo: ITodo
}
export function ToDoItem(props: TodoProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editableTitle, setEditableTitle] = useState<string>(props.todo.title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)
    const todosContext = useContext(TodosContext)
    const onClick = (value: string) => {
        todosContext.editTodo(props.todo.id, value)
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
                           value={editableTitle}
                           ref={editTitleInputRef}
                           onChange={(e) => {
                               setEditableTitle(e.target.value)
                           }}/>
                    <button onClick={() => onClick(editableTitle)}>save</button>
                </div>
                :
                <div className="task">
                    <input className="text"
                           style={{textDecoration: props.todo.completed ? 'line-through' : 'none'}}
                           value={props.todo.title}
                           readOnly/>
                    <input type="checkbox" onChange={() => todosContext.doneTodo(props.todo.id)}/>
                    <button onClick={() => {
                        setIsEditing(true)
                    }}>edit
                    </button>
                    <button onClick={() => todosContext.deleteTodo(props.todo.id)}>delete</button>
                </div>}
        </div>
    )
}
