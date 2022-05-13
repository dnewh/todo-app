import { nanoid } from "nanoid/async";

const backendUrl = 'http://localhost:3001';

export const createTodo = async (todo) => {
    const id = await nanoid();
    const newTodo = {id, value: todo, complete: false};
    const res = await fetch(`${backendUrl}/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: newTodo.id,
            value: newTodo.value,
            complete: newTodo.complete,
        })
    });
    return res.json();
}

export const getTodos = async () => {
    const res = await fetch(`${backendUrl}/api/todos`);
    return res.json();
}

export const updateTodo = async (todo) => {
    const res = await fetch(`${backendUrl}/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });

    return res.json();
}

export const deleteTodo = async (id) => {
    const res = await fetch(`${backendUrl}/api/todos/${id}`, {
        method: 'DELETE',
    });

    return res.json();
}


