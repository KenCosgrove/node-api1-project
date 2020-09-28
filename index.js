const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ hello: "node34" })
})

let users = [];


server.post('/api/users', (req, res) => {
    const data = req.body;

    users.push({ id: shortid.generate(), ...data })

    res.status(201).json({ data: users })

})

server.get('/api/users', (req, res) => {
    res.status(200).json({ data: users})
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const found = users.find(u => u.id === id)
    if(found){
        res.status(200).json({ data: found})
    } else {
        res.status(500).json({ message: "The user with the specified ID does not exist." })
    }
})

 
 
const port = 8000;
server.listen(port, () => console.log("api running"));