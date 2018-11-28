# Nodejs GraphQL Server - PostgreSQL

## Features

- **_async_** functions
- Eslint - Airbnb
- [Helmet](https://github.com/helmetjs/helmet) and [Rate limit](https://github.com/nfriedly/express-rate-limit) middlewares

## Getting Started

```bash
# Clone repository
https://github.com/sawantakash321/enter-sandman.git

# Change directory
cd enter-sandman

## Follow commands based on your package manager

# Install NPM dependencies
npm install

# Environment variables
* DATABASE_URI
* PORT
* NODE_ENV
* PAGE_SIZE

# Create and configure a .env file in the root directory
DATABASE_URI=postgres://role:password@host:port/dbname

PORT=3000

NODE_ENV=production

PAGE_SIZE=5

#Configure DATABASE_URI in config directories

1. [prod_keys](./src/config/prod_keys.js)
2. [dev_keys](./src/config/dev_keys.js)
2. [test_keys](./src/config/test_keys.js)


## Workflow:

# Create Tables
npm run createDB

# Create Indexes
npm run createIndex

# Insert Test Data
npm run populateDB

# Developement
npm run dev

# Testing
npm run test

# Linting
npm run eslint

# Build
npm run build

# Delete Build Directory
npm run clean

# Production
npm run serve

# Docker compose
docker-compose up
```

## Endpoints

```
# For Dev
http://localhost:3000/playground

# For production
http://localhost:3000/api
```

<details>
<summary>GraphQL Playground Queries</summary>

## Queries

Get User by ID

```
{
  users(id:1){
    id
    name
    createdAt
    companies{
      id
      createdAt
      name
      isContact
    }
    createdListings{
      id
      createdAt
      name
      description
    }
    applications{
      id
      createdAt
      listing{
        id
        name
        description
      }
      coverLetter
    }
  }
}
```

Get topActiveUsers

```
{
  topActiveUsers(page: 1){
    id
    name
    createdAt
    count
    listings{
      name
    }
  }
}

```

</details>
