const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Car toy is running');
});
app.listen(port, () => {
  console.log('Car toy is running');
});
