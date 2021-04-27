const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routers/api');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use('/api', router);
app.listen(port);
