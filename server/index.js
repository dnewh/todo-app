const express = require("express");
const cors = require("cors");
const todos = require("./routes/todos");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/todos", todos);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
