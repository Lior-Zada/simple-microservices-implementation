const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const serviceName = 'Moderation';
const port = 4003;

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);

    switch (req.body.type) {
        case 'NEW_COMMENT':
            moderateComment(req.body);
            commentModerated(req.body);
            break;
        default:
            break;
    }

    res.send({});
});

const moderateComment = (comment) =>
    (comment.status = ['badWord', 'anotherBadWord'].includes(comment.content) ? 'rejected' : 'approved');

const commentModerated = async (comment) =>{
    await axios.post('http://event-bus-srv:4006/events', {
        ...comment,
        type: 'COMMENT_MODERATED',  // type must be AFTER ...comment beause it also has a type, and it loops
    });
}
    
    
    

app.listen(port, () => console.log(`Moderation service listening on ${port}`));
