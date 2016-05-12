# packagefy

A NodeJS library for grouping modules from a given directory into a package object.

## Overview

**Packagefy** makes easier the process of grouping related modules from a given directory into package objects that can be exported from a index.js file. For example, supose the following directory structure within a my-package folder:

- |- my-package
- |   |- helpers.js
- |   |- index.js
- |   |- module-a.js
- |   |- module-b.js
- |   |- private-module.js

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

### `packagefy(baseDir, [options]) -> Object`

Scan the directory, load modules and expose them into an immutable (frozen) object.

- **baseDir** (String) directory where the modules should be loaded from (required). Generally `__dirname`.
- **options** (Object) non-mandatory set of options accepted by **packagefy** (see bellow).
- **return value** (Object) an immutable (frozen) hash containing the modules to be exposed.

#### options

##### exclude (RegExp|String|Function|Array)

A `RegExp`, `String` or `Function` used for determining which files should be excluded from the "package". Alternatively, can receive an array of these types (`RegExp`, `String` or `Function`). In that case, a logical disjunction between its values will be applied.
If defined as a `String`, perform an equality comparison between the value and the names of the files present at the directory. If defined as a `Function`, receive the file name (without the extension) as its first parameter. In that case, this function should acts as a predicate returning a `Boolean` equivalent value indicating whether the file should be excluded.

```javascript
// Defining a RegExp

module.exports = packagefy(__dirname, {
  exclude: /private/
});
```

```javascript
// Defining a simple String

module.exports = packagefy(__dirname, {
  exclude: 'private-module'
});
```

```javascript
// Using a predicate Function

module.exports = packagefy(__dirname, {
  exclude: (fileName) -> fileName.indexOf('private') >= 0
});
```

```javascript
// Finally, defining an array

module.exports = packagefy(__dirname, {
  exclude: [/private/, 'foo']
});
```

**Note:** the `index.js` and non-JavaScript files (obviously) are always excluded from the package object. 

##### onLoad (Function)

A `Function` invoked after each module being loaded. Receive the module name (the original file name without its extension) as the first parameter and the own module as the second one. It can be seen as a hook for executing some logic when the module is ready.

```javascript
module.exports = packagefy(__dirname, {
  onLoad(moduleName, module) {
    console.log('Loading %s', moduleName);
    doSomethingWith(module);
  }
});
```

##### transform (Function)

A `function` invoked for transforming the module name into a key of the package object. By default, the module name is converted to a camel case representation. Receive the module name and return the key as a string.

```javascript
module.exports = packagefy(__dirname, {
  transform(moduleName) {
    if(moduleName === 'some-class') {
      return 'SomeClass';
    }
    return _.camelCase(moduleName);
  }
});
```

## License

Copyright (c) 2016 Alan Ghelardi.

Licensed under the MIT license.
