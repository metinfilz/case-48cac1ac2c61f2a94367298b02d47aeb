#!/usr/bin/env node

import app from './app';
import http from 'http';

app.set('port', process.env.PORT || '3000');

const server = http.createServer(app);

server.listen(process.env.PORT || '3000');
server.on('error', () => process.exit(1));
server.on('listening', () => undefined);
