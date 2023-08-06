const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200);
});

app.post('/', bodyParser.json(), (req, res) => {  
  data = req.body;
  
  res.status(200);
  res.send("Success");
})

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});