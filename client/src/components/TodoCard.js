import React from "react";
import { updateTodo } from "../api/todos";

import './TodoCard.scss';

const TodoCard = ({todo, handleDeleteTodo, setTodos}) => {
    const handleToggleComplete = (id) => {
        updateTodo({
            id,
            value: todo.value,
            complete: !todo.complete,
        })
        .then(res => {
            setTodos(currTodos => {
                return currTodos.map(item => {
                    if (item.id === res.id) {
                        return {...item, complete: res.complete}
                    }
                    return item
                })
            })
        })
        
    };

    return (
        <div className={`todo-card ${todo.complete ? 'complete' : ''}`}>
            <p className="todo-value">{todo.value}</p>
            <div className="actions">
                <button className='btn complete-btn' onClick={() => handleToggleComplete(todo.id)}>
                    <i className="fa-solid fa-check" />
                </button>
                <button className='btn remove-btn' onClick={() => handleDeleteTodo(todo.id)}>
                    <i className="fa-solid fa-trash" />
                </button>
            </div>
        </div>
    )
};

export default TodoCard;