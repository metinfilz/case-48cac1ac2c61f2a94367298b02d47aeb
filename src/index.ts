#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import http from 'http';
import { init } from './db';

app.set('port', process.env.PORT || '3000');
const server = http.createServer(app);

init()
  .then(() => console.log('🚀 Database connection established.'))
  .catch((err) => console.error(err));

server.listen(process.env.PORT || '3000', () => console.log(`🚀 Library service ready at http://localhost:${process.env.PORT || 3000}`));
server.on('error', (err) => console.log(err.name, err.message));
