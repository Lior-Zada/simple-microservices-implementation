const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const serviceName = 'Comments service';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const {content} = req.body;
    const comments = commentsByPostId[postId] || [];
    comments.push({id: commentId, content});
    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4006/events', {
        type: 'NEW_COMMENT',
        commentId, 
        content,
        postId
    });

    res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);
    
    
    switch (req.body.type) {
        case 'NEW_POST':
            
            break;
    
        default:
            break;
    }

    res.send({});
});

app.listen(4001, () => console.log('Comments services listening on 4001.'))

