import React, { useState } from "react";
import propTypes from 'prop-types';
import { createTodo } from "../api/todos";

import "./TodoInput.scss";

const TodoInput = ({setTodos}) => {
    const [todo, setTodo] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo(todo)
        .then(res => {
            const {id, value, complete} = res;
            setTodo("");
            setError("");
            const newTodo = {id, value, complete};
            setTodos(currTodos => {
                return [...currTodos, newTodo]
            });
        })
        .catch(err => {
            console.error(err);
            setError("Could not submit new todo");
        })
    }
    
    return (
        <form id="todo-input" onSubmit={handleSubmit}>
            <label htmlFor="add-todo">Add Todo</label>
            <input type="text" id="add-todo" name="todo" placeholder="Add new todo" value={todo} onChange={handleChange} />
            <div className="submit">
                <button type="submit" form="todo-input">Submit</button>
                {error && 
                    <span className="error">{error}</span>
                }
            </div>
        </form>
    )
}

TodoInput.propTypes = {
    setTodos: propTypes.func.isRequired
}

export default TodoInput;
