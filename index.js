const express = require('express');
const app = express();
const router = require('./routers/index.js');
const cors = require('cors');

app.use(
  cors({
    origin: 'https://concert-psi.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

router(app, express);

app.listen(3001, (error) => {
  if (error) {
    console.log('Error running server');
    return;
  }

  console.log('Server is running on port 3001');
});
