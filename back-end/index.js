const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const db = require('./db.js');

data = db.query(
  'SELECT * FROM role'
).then(data => console.log(data[0]))
.catch(err => console.log('Failed connect database\n'))


const app = express();
const port = 4000;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

// Ip 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


