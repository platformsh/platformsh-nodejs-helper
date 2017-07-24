# platformsh-nodejs-helper

Helper for running nodejs applications on Platform.sh.

## Purpose

Reads [Platform.sh configuration](https://docs.platform.sh/development/variables.html) from environment and returns a single object.

## Usage:
```bash
npm install platformsh --save
```
And in your code:

```javascript
const config = require('platformsh').config();
```

Warning: the previous call will fail with 'Error: This is not running on platform.sh' if the PLATFORM_PROJECT environment variable is not set. In development, you might want to provide a default config :

```javascript
let config;
  if(!process.env.PLATFORM_PROJECT) {
    config = {
      port: 3000,
      // ...
    };
  }
  else {
    config = require('platformsh').config();
  }
```
