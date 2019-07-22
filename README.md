# CodingSans Backend Test

The main goal is to create a web application which can authenticate via JWT (Json Web Token), and serve an API to GET a list of breweries filtered by a query based on the openbrewerydb.

For the web serving part you could use either 
- [Koa](https://koajs.com/)
- [Express](https://expressjs.com/)

Please include a middleware for logging on all requests
- https://github.com/koajs/logger
- https://github.com/expressjs/morgan

The login endpoint ( `POST /login` ) should return a signed JWT token on correct username/password.

The token should be signed with https://github.com/auth0/node-jsonwebtoken and the signing secret should be provided via config.

The POST request's body will contain `{ username: string, password: string }`.

The correct username/password combination should be provided via config, because the application should be database-less.

For config handling I would recommend our guide: https://codingsans.com/blog/node-config-best-practices

The breweries endpoint ( `GET /breweries` ) should be guarded by a JWT middleware.
- https://github.com/koajs/jwt
- https://github.com/auth0/express-jwt

The datasource should be the OpenBreweryDB https://www.openbrewerydb.org/

Use the search API to fetch the data `https://api.openbrewerydb.org/breweries/search?query=dog`

To fetch the data use either:
- https://github.com/axios/axios
- https://github.com/bitinn/node-fetch

The search param will be provided in the query params ( `GET /breweries?query=dog` )

If the user is not authenticated on `GET /breweries` return `401`.

If the user not provided a query param return data from `https://api.openbrewerydb.org/breweries`

If the user called any other then `POST /login` or `GET /breweries` return `404`.


Please use typescript, we included linting and testing in this project.

You can start the project with `yarn start`.
You can check the lint and formatting of the project with `yarn lint`.

If you are using VSCode you can use these extensions:
- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
