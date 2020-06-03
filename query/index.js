const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const serviceName = 'Query service';
const port = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/events', (req, res) => {
    handleEvent(req.body);
    res.send({});
});

const handleEvent = (data) => {
    const { type, postId, commentId, title, content, status } = data;

    console.log(`${serviceName} received event ${type}`);

    switch (type) {
        case 'NEW_POST':
            posts[postId] = { id: postId, title, comments: [] };
            break;
        case 'NEW_COMMENT':
            if (posts[postId]) {
                posts[postId].comments.push({
                    id: commentId,
                    content,
                    status,
                });
            }
            break;
        case 'COMMENT_UPDATED':
            const comment = posts[postId].comments.find(
                (comment) => comment.id === commentId
            );
            comment.content = content;
            comment.status = status;
            break;
        default:
            break;
    }
};
app.get('/posts', (req, res) => res.send(posts));

app.listen(port, async () => {
    console.log(`Query service listening on ${port}`);
    const res = await axios.get('http://localhost:4006/events');
    res.data.forEach((event) => handleEvent(event));
});
