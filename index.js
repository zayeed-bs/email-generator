const express = require('express');
const bodyParser = require('body-parser');
const runPrompt = require('./runPrompt');

require('./runPrompt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
let requestsCount = 0;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200);
});

app.post('/generate-email', bodyParser.json(), async (req, res) => {  
  data = req.body;

  requestsCount++;
  console.log(`Request ${requestsCount}, ${req.socket.remoteAddress}`);

  response = await runPrompt(data.summary);

  res.status(200);
  res.json({response: response});
})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});