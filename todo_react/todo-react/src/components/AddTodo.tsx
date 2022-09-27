import React, {ChangeEvent, useState} from "react";
import {useTodoContext} from "../context/context";

export const AddTodo: React.FC = () => {
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
        dispatch({type: "added", title: currentTitle});
        setCurrentTitle("");
        setError("");
    };
    return <div>
        <form className="new-todo-form">
            <input type="text"
                   value={currentTitle}
                   onChange={onChange}
                   placeholder="What do you want to do?"
                   className="new-todo-input"
            />
            <button type="submit" onClick={onClick} className="new-todo-submit">
                Add todo
            </button>
        </form>
        <p className="error">{error}</p>
    </div>
};