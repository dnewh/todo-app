import React, { useState, useEffect } from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoCard from "./TodoCard";
import { getTodos, deleteTodo } from "../api/todos";

import './App.scss';

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos()
        .then( res => {
            const items = res.map((todo) => {
                let { id, value, complete } = todo;
                return { id, value, complete};
            });
            setTodos(items);
        })
        .catch( err => console.error(err))
    }, [])

    const handleDeleteTodo = (todoId) => {
        deleteTodo(todoId)
        .then(res => {
            const { id } = res;
            setTodos(currTodos => currTodos.filter(item => item.id !== id))
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="app">
            <Header />
            <TodoInput todos={todos} setTodos={setTodos} />
            <div className="todo-list">
                {todos.map((todo) => 
                    <TodoCard key={todo.id} todo={todo} setTodos={setTodos} handleDeleteTodo={handleDeleteTodo} />
                )}
            </div>
        </div>
    )
}

export default App;
