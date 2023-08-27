![Build status](https://github.com/mifi/editly/actions/workflows/test.yml/badge.svg)
# Library API
This project serves as a case study for a backend developer position. The outlined operations below form the focal point of the project:

## Logical Requirements
- List users
- Access user information (name, history of borrowed books, currently borrowed books)
- Create a new user
- List books
- Access book information (name, average rating)
- Create a new book
- Borrow a book
- Return a book and provide a rating

## Technical Requirements
- The REST API has been developed using the <b>Express.js</b> library.
- The development language of choice is <b>TypeScript</b>.
- <b>Postgres</b> is used for database management. The DDL script for the database is provided alongside the solution.
- <b>Sequelize</b> ORM is utilized for database operations.
- Data sent in API requests is validated using the <b>Joi</b> validator.
- The application provides appropriate API responses for error scenarios (e.g., 500 Internal Server Error).

## Database Diagram
![db.png](https://github.com/metinfilz/case-48cac1ac2c61f2a94367298b02d47aeb/blob/main/db.png)
[DDL File](https://raw.githubusercontent.com/metinfilz/case-48cac1ac2c61f2a94367298b02d47aeb/main/db.dll)


## NPM Scripts
````
$ npm run build
$ npm run lint
$ npm run prettier
$ npm run start
$ npm run test
````

## Usage Guide
Below are the steps to run the project on your local machine:
``` bash
$ git clone https://github.com/metinfilz/case-48cac1ac2c61f2a94367298b02d47aeb.git
$ cd case-48cac1ac2c61f2a94367298b02d47aeb
$ npm install
$ npm run build
$ npm run start
```

## Docker
Below are the steps to run the project on docker:
``` bash
$ git clone https://github.com/metinfilz/case-48cac1ac2c61f2a94367298b02d47aeb.git
$ cd case-48cac1ac2c61f2a94367298b02d47aeb
$ docker-compose up
```

## Contributions and Contact
If you would like to contribute to the project, feel free to submit a pull request. For any questions or suggestions, do not hesitate to get in touch with me.
