# Config Setup

The app uses 3 environments (test, development, production) with production as default if nothing is specified.
The environment variables are loaded from this folder ( ROOT\config ).
Please provide the variables via .env.development .env.test respectively.

**Required Env Variables**

- MONGO_CONNECTION_STRING
- JWT_SECRET
- JWT_EXPIRATION

_Note:_
In testing mode the project uses mongodb-memory-server, which can theoretically fail on initialization depending on system architecture.
In that case please provide it with a version that's compatible with your system.
