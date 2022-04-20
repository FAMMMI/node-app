const express = require('express');
const app = express();
var cors = require('cors');

const port = process.env.PORT || 5000;
const users = [
    { id: 1, name: "abr" },
    { id: 2, name: "dbr" },
    { id: 3, name: "abfvr" },
    { id: 4, name: "dfbra" }
];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World from fami!')
});

app.get("/users", (req, res) => {
    console.log('query', req.query);
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(matched);
    } else {
        res.send(users);
    }

})

app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    res.send(user)

})

app.post('/user', (req, res) => {
    console.log('request', req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
})

app.listen(port, () => {
    console.log("Listening to port", port)
});