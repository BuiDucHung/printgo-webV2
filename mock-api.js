const express = require('express');
const apiMocker = require('connect-api-mocker');
const cors = require('cors');
 

const port = 8000;

const app = express();
app.use(cors());

app.use('/api', apiMocker('mock-api'));
app.listen(port, () => console.log('Mocker run on port: ' + port));