const express = require('express');
const axios = require('axios');
const port = 4002;
const cors = require('cors');
const bodyParser = require('body-parser');
const serviceName = 'Query service';
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);
    
    switch (req.body.type) {
        case 'NEW_POST':
            break;

        case 'NEW_COMMENT':
            break;
        default:
            break;
    }
});

app.get('/posts', (req, res) => {

    res.send(posts);
});

app.listen(port, () => console.log(`Query service listening on ${port}`));
