const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
require('dotenv').config();
const { errorLogger, errorHandler, boomHandler, sqlError } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://www.myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'))
    }
  }
}
app.use(cors(options))

routerApi(app)


// app.use(errorLogger);
app.use(sqlError);
app.use(boomHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`> Listening on port ${port}`);
})