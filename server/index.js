const express = require('express');
const path = require("path");

const app = express();
const wordc = path.resolve("../")
const pathToBuild = path.join(wordc, 'build');

app.use(express.static(pathToBuild));

app.use('/wordcloud/static', express.static(pathToBuild+"/static"));

app.get('/wordcloud', function (req, res) {
  res.sendFile(path.join(wordc, 'build', 'index.html'));
});

app.listen(5000);

console.log("Word cloud server",wordc);