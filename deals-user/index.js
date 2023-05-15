require('dotenv').config();
const http = require('http');
const express = require('express');
const routes = require('./src/routes');
const contextMiddleware = require('./src/middleware/context');
const db = require('./src/models');
const dsn = process.env.MONGO_DSN;
db.mongoose.connect(dsn,
  {
    useNewUrlParser: true
  }
).then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

const app = express();
app.use(contextMiddleware);
app.use(express.json());
app.use('/api/v1', routes);

// handle error 500
app.use(function (err, req, res, next) {
  
  console.log(err);
  res.status(500)
  res.json({
    message: err.message
  })
});

const port = process.env.APP_PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.info('app-startup', `🚀 Server start on port ${port}. Running with ${process.env.NODE_ENV} environment...`)
});
    