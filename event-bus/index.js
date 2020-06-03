const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 4006;

const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    try {
        axios.post('http://localhost:4000/events', event); //update Posts service
        axios.post('http://localhost:4001/events', event); //update Comments service
        axios.post('http://localhost:4002/events', event); //update Query service    

        res.send({status: 'Event registered', success: true});
    } catch (error) {
        res.send({status: 'Failed updating one of the services', success: false});
    }
});

app.listen(port, () => console.log(`Event bus listening on ${port}`));