express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const PORT = 3000;
app.use(express.static(__dirname + "/webApp"));
http.listen(PORT, _ => {
  console.log('listening on *:3000');
});




