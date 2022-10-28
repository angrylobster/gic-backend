## Description

This app was built with [Nest](https://github.com/nestjs/nest), a TypeScript framework for Node.js backend web-applications.

## Pre-requisites
- Node.js (v17.3.0)
  - Recommended that you install [Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm/) and install Node.js from there
- MongoDB Community Edition (v6.0)
  - Recommended that you refer to the [MongoDB installation page](https://www.mongodb.com/docs/manual/installation/)

## Installation
Installation step should always be completed before running in development or for production.

```bash
$ npm install
```

## Setting the MongoDB URI
If running locally, you can create an environment file named `.env` in the root folder of this repository to supply the Node.js environment variable `MONGO_URI`. 

```bash
#.env

MONGO_URI='mongodb://localhost:27017/gic-backend'

# This is an example of a valid MongoDB URI. You will need to supply a protocol, hostname, port and database name.
```

If running for production, the machine running this server will need to be supplied the `MONGO_URI` into its Node.js environment.

## Running locally
Please use the following script to run the code locally on your machine with Node.js.

```bash
$ npm run start:dev
```

## Building and running for production
To build for production, please use the following script:

```bash
$ npm run build
```

This will generate a `dist/` folder containing transpiled JavaScript code that can run our server.

The server can be run with the following script once the `dist/` folder has been built:

```bash
$ node dist/main.js
```

If running for production, the machine running this server will need to be supplied the `MONGO_URI` into its Node.js environment.
