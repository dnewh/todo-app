const express = require("express");
const router = express.Router();

const todoList = new Map();

router.post('/', async (req, res) => {
    const {
        id,
        value,
        complete,
    } = req.body;

    if (!id || !value) {
        return res.status(400).send("Invalid todo");
    }
    try {
        todoList.set(id, {value, complete});
        res.json({
            id,
            value,
            complete,
        })
    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {
    try {
        /// Convert `todoList` Map into JSON array w/ ID as a field
        res.json([...todoList].map(([k, v]) => {
            return {
                id: k,
                value: v.value,
                complete: v.complete,
            };
        }));
    } catch (error) {
        res.send(error);
    }
})

router.put('/:id', async (req, res) => {
    const todoKey = req.params.id;
    const {
        id,
        value,
        complete,
    } = req.body;

    if (!id || !value) {
        return res.status(400).send("Invalid todo");
    }

    try {
        if (!todoList.has(todoKey)) {
            return res.status(404).send(`No todo with ID ${id}`);
        }
        
        todoList.set(todoKey, {value, complete});
        res.json({
            id,
            value,
            complete,
        })
    } catch {
        res.send(error);
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const todo = todoList.get(id);
        if (!todo) {
            return res.status(404).send(`No todo with ID ${id}`);
        }

        if (!todoList.delete(id)) {
            res.status(500).send('Internal server error: could not delete todo')
        }

        res.json({
            id,
            value: todo.value,
            complete: todo.complete,
        });
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;
