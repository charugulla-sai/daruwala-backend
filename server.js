// Import express
import express from 'express';
import dotenv from 'dotenv/config';

// Create server
const server = express();

// Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to E-commerse application');
});

// Add listner
const port = process.env.PORT;
server.listen(port || 3000, () => {
  console.log(`Server is started listning at port ${port ? port : 3000}`);
});
