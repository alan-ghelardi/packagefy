# packagefy

A NodeJS library for grouping modules from a given directory into a package object.

## Overview

Packagefy makes easier the process of grouping related modules from a given directory into package objects that can be exported from a index.js file. For example, supose the following directory structure within a my-package folder:

* + my-package
* ++ helpers.js
* ++ index.js
* ++ module-a.js
* ++ module-b.js
* ++ private-module.js

After requiring the packagefy module within index.js and calling the packagefy exposed function, the library will scan the folder, load all modules (except the index itself) and expose them as properties of an immutable plain JavaScript object. Additionally, you may exclude "private" modules from the created package. For example:
```javascript
// index.js
const packagefy = require('packagefy');

module.exports = packagefy(__dirname, {
  exclude: /private/
});
```

The code above will export the following object:
```
{
  helpers: [Object],
  moduleA: [Object],
  moduleB: [Object]
  }
```

## Documentation

### Installation

```shell
npm install packagefy
```

### Usage

The documentation will be improved with more available functionalities in the next days.

## License

Copyright (c) 2016 Alan Ghelardi.

Licensed under the MIT license.
