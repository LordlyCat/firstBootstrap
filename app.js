const express = require('express');
const path = require('path');
const app = express();
//var jq = require('bootstrap');
const port = 8089;
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening at port`);
});