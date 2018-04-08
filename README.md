# platformsh-nodejs-helper

Helper for Node.js applications running on Platform.sh.

## Purpose

Reads [Platform.sh configuration](https://docs.platform.sh/development/variables.html) from environment and returns a single object.

## Usage:

```bash
npm install platformsh || yarn add platformsh
```

And in your code:

```javascript
import psh from "platformsh";

if (psh.isOnPlatform()) {
  // use "psh" as you like
  myVar = psh.getVariables().myVar;
}
```
