const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
require('dotenv').config();
const { errorLogger, errorHandler, boomHandler, ormErrorHandler } = require('./middlewares/error.handler');
// const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

// const whitelist = ['http://localhost:8080', 'https://www.myapp.com']
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed'))
//     }
//   }
// }
// app.use(cors(options))
app.use(cors())

// app.get('/', checkApiKey, (req, res) => {
//   res.send('Authenticated')
// })

require('./utils/auth');

routerApi(app)


app.use(errorLogger);
app.use(ormErrorHandler);
app.use(boomHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`> Listening on port ${port}`);
})