const express = require('express');
const idCardRoutes = require('./controller/idCardController');

const app = express();
const port = 3000;

app.use('/api', idCardRoutes);

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
