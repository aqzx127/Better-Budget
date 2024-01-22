const express = require('express');
const cors = require('cors');
const app = express();

const port = 3001;

app.use(cors());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});