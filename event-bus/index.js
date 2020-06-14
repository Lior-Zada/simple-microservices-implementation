const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const serviceName = 'Event-Bus';
const port = 4006;

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    console.log(`${serviceName} received event ${req.body.type}`);
    
    const event = req.body;
    events.push(event); // Store events for recovery or syncing new services.

    axios.post('http://posts-clusterip-srv:4000/events', event); //update Posts service
    axios.post('http://comments-srv:4001/events', event); //update Comments service
    axios.post('http://query-srv:4002/events', event); //update Query service
    axios.post('http://moderation-srv:4003/events', event); //update Moderation service

    res.send({ status: 'Event registered', success: true });
});

app.get('/events', (req, res) => res.send(events));

app.listen(port, () => console.log(`${serviceName} listening on ${port}`));
