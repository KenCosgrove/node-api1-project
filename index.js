const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());
 
let users = [];

server.post('/api/users', (req, res) => {
    try {
        const data = req.body;
        if (data.bio && data.name) {
          users.push({ id: shortid.generate(), ...data });
          res.status(201).json({ data: { users } });
        } else {
          res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
        }
      } catch {
        res.status(500).json({
          errorMessage: 'There was an error while saving the user to the database',
        });
      }
    });

server.get('/api/users', (req, res) => {
    try {
        res.status(200).json({ data: users });
      } catch {
        res.status(500).json({
          errorMessage: "The users information could not be retrieved"
        });
      }
    });

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const found = users.find(u => u.id === id)
    if(found){
        res.status(200).json({ data: found})
    } else if (!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: 'The user information could not be retrieved.' });
      }
    });

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const found = users.find(u => u.id === id);

    try {
        if (found) {
            users = users.filter((user) => user.id !== id);
            res.status(200).json({ data: { users } });
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        } catch {
            res.status(500).json({ errorMessage: 'The user could not be removed' });
        }
    });    

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const found = users.find(u => u.id === id);
    const changes = req.body;

    try {
        if(found && (changes.bio && changes.name)) {
            Object.assign(found, changes);
            res.status(201).json({data: {users} });
        } else if (!found) {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'});
        } else {
            res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
        }
        } catch {
            res.status(500).json({ errorMessage: "The user information could not be modified." })
        }
    })
 
const port = 8000;
server.listen(port, () => console.log("api running"));