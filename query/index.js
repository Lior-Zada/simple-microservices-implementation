const express = require('express');
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
    const { type, postId, commentId, title, content, status } = req.body;

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
    // console.log(posts);
    res.send({});
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.listen(port, () => console.log(`Query service listening on ${port}`));
