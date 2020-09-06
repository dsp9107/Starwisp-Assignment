# Starwisp Assignment

## Contents

- [Setup](#setup)
- [API](#api)

## Setup

- Install dependencies

```bash
npm install
```

- Create a .env file in the root directory with these contents. replace `<...>` with your credentials

```
PORT=9107
JWT_SECRET='secret-key'
DB_USER=<username to MySQL Server>
DB_PASS=<password to MySQL Server>
DB_HOST=localhost
DB_DATABASE=starwisp
DB_ENV=testing
```

- If you have `nodemon` installed globally, start the server with

```bash
npm start
```

- If not, start the server with

```bash
node .
```

- Serve React App

```bash
cd public
yarn serve
```

## API

All the entrypoints are defined here.

Root URL - [http://localhost:9107/api](http://localhost:9107/api)

### Routes - Users

-   [Login](https://github.com/dsp9107/Starwisp-Assignment/blob/master/documentation/user-routes.md#login)
-   [Logout](https://github.com/dsp9107/Starwisp-Assignment/blob/master/documentation/user-routes.md#logout)

### Routes - University

-   [Create One](https://github.com/dsp9107/Starwisp-Assignment/blob/master/documentation/university-routes.md#create-one)
-   [Read All](https://github.com/dsp9107/Starwisp-Assignment/blob/master/documentation/university-routes.md#read-all)
-   [Update One](https://github.com/dsp9107/Starwisp-Assignment/blob/master/documentation/university-routes.md#update-one)
-   [Delete One](https://github.com/dsp9107/Starwisp-Assignment/blob/master/documentation/university-routes.md#delete-one)
