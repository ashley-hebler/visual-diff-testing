const express = require('express');
const app = express();
const opn = require('opn');

app.use(express.static('public/'));
console.log('Serving at:');
console.log('http://localhost:8080/');
global.__SERVER__ = app.listen(8080);
opn('http://localhost:8080/');
