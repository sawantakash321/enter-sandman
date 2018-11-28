/* eslint-disable no-console */

// Load environment variables from .env file
require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { checkDbConnection } = require('./utils');
const {
  Query, companies, teams, applications, listings
} = require('./resolvers');

const config = require('./config');

const resolvers = {
  Query,
  companies,
  teams,
  applications,
  listings
};
const typeDefs = './src/schema/schema.graphql';
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req })
});

// don't show the log when it is testing
if (process.env.NODE_ENV !== 'testing') {
  // Check database connection
  checkDbConnection();
  // use morgan to log at command line
  server.express.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
// HTTP security middleware
server.express.use(helmet());

// only if you're behind a reverse proxy
// (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
server.express.enable('trust proxy');

//  apply rate limiter to all requests
server.express.use(config.limiter);

// Body parser middleware
server.express.use(bodyParser.urlencoded({ extended: false }));
server.express.use(bodyParser.json());

// allow cross-origin requests
server.express.use(cors());

server.start(config.options, ({ port }) => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = { server };
