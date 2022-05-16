import React from "react";
import propTypes from 'prop-types';
import { updateTodo, deleteTodo } from "../api/todos";

import './TodoCard.scss';

const TodoCard = ({todo, setTodos}) => {
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

    const handleDeleteTodo = (todoId) => {
        deleteTodo(todoId)
        .then(res => {
            const { id } = res;
            setTodos(currTodos => currTodos.filter(item => item.id !== id))
        })
        .catch(err => console.error(err))
    }

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

TodoCard.propTypes = {
    todo: propTypes.shape({
        id: propTypes.string,
        value: propTypes.string,
        complete: propTypes.bool,
    }).isRequired,
    setTodos: propTypes.func.isRequired,
}

export default TodoCard;
