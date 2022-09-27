import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {ITodo} from "../models";
import {useTodoContext} from "../context/context";

interface TodoProps {
    todo: ITodo
};

export function ToDoItem(props: TodoProps) {
    const editTitleInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState<string>(props.todo.title);
    let {dispatch} = useTodoContext();
    const onEditClick = (title: string) => {
        setEditableTitle(title);
        setIsEditing(true);
    };
    const onEditChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(event.target.value);
    };
    useEffect(() => {
        if (isEditing) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditing]);
    return (
        <div>
            {isEditing ?
                <div className="task">
                    <input className="text"
                           id="edit-text"
                           value={editableTitle}
                           ref={editTitleInputRef}
                           onChange={onEditChange}/>
                    <button onClick={() => {
                        dispatch({
                            type: "changed",
                            id: props.todo.id,
                            completed: props.todo.completed,
                            title: editableTitle
                        });
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
                    <input type="checkbox" onChange={() => dispatch({
                        type: "changed",
                        id: props.todo.id,
                        completed: !props.todo.completed,
                        title: editableTitle
                    })}
                           checked={props.todo.completed}/>
                    <button onClick={() => {
                        onEditClick(props.todo.title);
                    }}>edit
                    </button>
                    <button onClick={() => dispatch({
                        type: "deleted",
                        id: props.todo.id,
                        completed: props.todo.completed,
                        title: editableTitle
                    })}>delete
                    </button>
                </div>}
        </div>
    )
}
