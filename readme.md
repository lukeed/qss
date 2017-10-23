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
  --> 1,218,706 ops/sec ±0.24% (94 runs sampled)
native
  --> 4,271,253 ops/sec ±0.84% (93 runs sampled)
query-string
  --> 267,467 ops/sec ±0.88% (90 runs sampled)
querystringify
  --> 1,046,418 ops/sec ±0.23% (94 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)
