import React, {ChangeEvent, useState} from "react";
import {useTodoContext} from "../context/context";

export const AddToDo: React.FC = () => {
    let {dispatch} = useTodoContext();
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [error, setError] = useState<string>("");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(event.target.value);
    };
    const onClick = (event: any) => {
        event.preventDefault();
        if (!currentTitle || !currentTitle.trim()) {
            setError("Please, enter valid value");
            return
        }
        dispatch({type: "added", id: Math.floor(Math.random() * 100), completed: false, title: currentTitle});
        setCurrentTitle("");
        setError("");
    };
    return <div>
        <form className="new-task-form">
            <input type="text"
                   value={currentTitle}
                   onChange={onChange}
                   placeholder="What do you want to do?"
                   className="new-task-input"
            />
            <button type="submit" onClick={onClick} className="new-task-submit">
                Add task
            </button>
        </form>
        <p className="error">{error}</p>
    </div>
};