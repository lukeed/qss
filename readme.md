# qss [![Build Status](https://travis-ci.org/lukeed/qss.svg?branch=master)](https://travis-ci.org/lukeed/qss)

> A tiny (215b) browser utility for stringifying a query Object.

You should only consider using this within a browser context since Node's built-in [`querystring.stringify`](https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options) is [much faster](#benchmarks) and _should be_ used in a Node environment! An ideal use case is serializing a query object before an API request is sent.

This module exposes three module definitions:

* **ES Module**: `dist/qss.es.js`
* **CommonJS**: `dist/qss.js`
* **UMD**: `dist/qss.min.js`


## Install

```
$ npm install --save qss
```


## Usage

```js
import qss from 'qss';

qss({ foo:'hello', bar:[1,2,3], baz:true });
//=> 'foo=hello&bar=1&bar=2&bar=3&baz=true'

qss({ foo:123 }, '?');
//=> '?foo=123'

qss({ bar:'world' }, 'foo=hello&');
//=> 'foo=hello&bar=world'
```


## API

### qss(params, prefix)

#### params
Type: `Object`

The object that contains all query parameter keys & their values.

#### prefix
Type: `String`<br>
Default: `''`

An optional prefix. The stringified `params` will be appended to this value, so it must end with your desired joiner; eg `?`.

> **Important:** No checks or validations will run on your `prefix`. Similarly, no character is used to "glue" the query string to your `prefix` string.


## Benchmarks

```
qss
  --> 1,177,339 ops/sec ±0.25% (96 runs sampled)
native
  --> 4,298,475 ops/sec ±0.36% (96 runs sampled)
query-string
  --> 263,307 ops/sec ±1.03% (88 runs sampled)
querystringify
  --> 1,040,005 ops/sec ±0.26% (96 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)
