const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const serviceName = 'Posts service';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id,
        title,
    };
    await axios.post('http://localhost:4006/events', {
        type: 'NEW_POST',
        data: posts[id],
    });
    
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);
    switch (req.body.type) {
        case 'NEW_COMMENT':
            
            break;
    
        default:
            break;
    }

    res.send({});
});

app.listen(4000, () => console.log('Posts service listening on port 4000.'));
