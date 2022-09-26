import React, {useEffect, useRef, useState} from 'react';
import {ITodo} from "../models";
import {useTodoContext} from "../context/context"

interface TodoProps {
    todo: ITodo
}

export function ToDoItem(props: TodoProps) {
    const editTitleInputRef = useRef<HTMLInputElement>(null)
    const [isEditing, setIsEditing] = useState(false)
    const todosContext = useTodoContext()
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
                           value={todosContext.editableTitle}
                           ref={editTitleInputRef}
                           onChange={todosContext.onEditChange}/>
                    <button onClick={() => {
                        todosContext.editTodo(props.todo.id, todosContext.editableTitle);
                        setIsEditing(false)
                    }}>save
                    </button>
                </div>
                :
                <div className="task">
                    <input className="text"
                           style={{textDecoration: props.todo.completed ? 'line-through' : 'none'}}
                           value={props.todo.title}
                           readOnly/>
                    {props.todo.completed ?
                        <input type="checkbox" onChange={() => todosContext.doneTodo(props.todo.id)} checked/>
                        :
                        <input type="checkbox" onChange={() => todosContext.doneTodo(props.todo.id)}/>
                    }
                    <button onClick={() => {
                        todosContext.onEditClick(props.todo.title);
                        setIsEditing(true)
                    }}>edit
                    </button>
                    <button onClick={() => todosContext.deleteTodo(props.todo.id)}>delete</button>
                </div>}
        </div>
    )
}
