const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);