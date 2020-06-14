const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const serviceName = 'Comments service';
const port = 4001;

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
    const { content } = req.body;
    const comments = commentsByPostId[postId] || [];
    const status = 'pending';
    comments.push({ id: commentId, content, status });
    commentsByPostId[postId] = comments;

    await axios.post('http://event-bus-srv:4006/events', {
        type: 'NEW_COMMENT',
        commentId,
        content,
        status,
        postId,
    });

    res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);

    switch (req.body.type) {
        case 'COMMENT_MODERATED':
            updateComment(req.body);
            break;
        default:
            break;
    }

    res.send({});
});

const updateComment = async (comment) => {
    await axios.post('http://event-bus-srv:4006/events', {
        ...comment,
        type: 'COMMENT_UPDATED',
    });
};

app.listen(port, () =>
    console.log(`${serviceName} listening on port ${port}.`)
);
