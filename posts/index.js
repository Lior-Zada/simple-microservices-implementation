const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const serviceName = 'Posts service';
const port = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id,
        title,
    };
    await axios.post('http://event-bus-srv:4006/events', {
        type: 'NEW_POST',
        postId: id,
        title,
    });
    
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);
    
    res.send({});
});

app.listen(port, () => console.log(`${serviceName} listening on port ${port}.`));
