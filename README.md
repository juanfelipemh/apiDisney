# API Disney

![Alt Text](/utils/titulo.JPG)

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Description

You can consume this API Rest when you can find the following information:

- Characters of movies: CRUD and searches implemented.
- Movies: CRUD and searches implemented.
- Genders: CRUD and searches implemented.

Also, you have a controller when you can create the relation between these entities. This is a step important because there are searches that implement JOIN queries. 

## Technologies

- Node.js
- MySQL
- Docker (optional, if Docker is used for execution)
- Sequelize
- Swagger
- Express.js
- Argon2
- JWT

## Installation with NodeJs

1. Clone this repository: `git clone https://github.com/juanfelipemh/apiDisney`
2. Navigate to the project directory: `cd project-name`
3. Install dependencies: `npm install`
4. You can create the database using the queryParaDocker.sql (Find in the project) or using sequelize-cli and migrate the database.
5. When you migrate the data, you can run: `npm run dev` or `npm run start`

## Installation with Docker
1. Clone this repository: `git clone https://github.com/your-user/your-repo.git`
2. Navigate to the project directory: `cd project-name`
3. Install dependencies: `docker compose up --build`
4. You need to create the database using the queryParaDocker.sql (Find in the project)

*You should installed Docker in your equipment

## Usage

Run the project

```bash
$ npm run dev
```
![Alt Text](/utils/1.png)

When the server is running you can access to the following URL

```bash
http://localhost:4000/api-doc
```
![Alt Text](/utils/2.png)

Create an user using the Endpoint Register in the Authorization User

![Alt Text](/utils/3.png)

Login with the user created to obtain the JWT token. You need to copy this to the CRUD endpoints

![Alt Text](/utils/4.png)

In the header, you can add the token of JWT in authorization option

![Alt Text](/utils/5.png)

Now, you can use all endpoints because you are authenticated. 

![Alt Text](/utils/6.png)


## Contact:

You can contact me:

- My email: <a style="margin-left: 8px;" href="mailto:juanfelipemh@gmail.com">juanfelipemh@gmail.com</a>

- [LinkedIn](https://www.linkedin.com/in/juanfelipemh/) My LinkedIn profile
