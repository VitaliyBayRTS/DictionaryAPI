import { createServer } from 'http';
import app from './app.mjs';

const port = process.env.PORT || 4000;

const server = createServer(app);

server.listen(port);