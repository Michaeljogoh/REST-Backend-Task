<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A simple REST application from scratch. The application is a nodeJS server API communicating with this: https://reqres.in/. every code path is covered with units tests using jest.

**POST /api/users**

On the request store the user entry in mongodb database. After the creation, sent an email and rabbit event with no consumer.

**GET /api/user/{userId}**

Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.

**GET /api/user/{userId}/avatar**

Retrieves image by 'avatar' URL.

On the first request it should save the image as a plain file, stored as a mongodb entry with userId and hash. Return its base64-encoded representation.

On following requests should return the previously saved file in base64-encoded. representation (retrieve from db).

**DELETE /api/user/{userId}/avatar**

Removes the file from the FileSystem storage.

Removes the stored entry from db.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Michael Jogoh](https://michaeljogoh.vercel.app)
- Website - [https://michaeljogoh.vercel.app](https://michaeljogoh.vercel.app)


## License

Nest is [MIT licensed](LICENSE).

## Acknowledgments
* [Choose an Open Source License](https://choosealicense.com)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [Jest](https://jestjs.io/)
* [Nest.js](https://docs.nestjs.com/ )
* [MongoDB](https://www.mongodb.com/)
* [RabbitMQ](https://www.rabbitmq.com/)
