const express = require('express')
const morgan = require('morgan')
const route = require('./src/routes/index.js');

const app = express();
const port = 4000;

app.use(morgan('combined'));

// Routes init
route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


