import express from 'express';

async function startServer() {
  const app = express();

  const port = 8000;

  app
    .listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
