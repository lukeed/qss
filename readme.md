# qss [![Build Status](https://travis-ci.org/lukeed/qss.svg?branch=master)](https://travis-ci.org/lukeed/qss)

> A tiny (305B) browser utility for stringifying a query Object.

You should only consider using this within a browser context since Node's built-in [`querystring.stringify`](https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options) is [much faster](#benchmarks) and _should be_ used in a Node environment! An ideal use case is serializing a query object before an API request is sent.

This module exposes three module definitions:

* **ES Module**: `dist/qss.mjs`
* **CommonJS**: `dist/qss.js`
* **UMD**: `dist/qss.min.js`


## Install

```
$ npm install --save qss
```


## Usage

```js
import { encode, decode } from 'qss';

encode({ foo:'hello', bar:[1,2,3], baz:true });
//=> 'foo=hello&bar=1&bar=2&bar=3&baz=true'

encode({ foo:123 }, '?');
//=> '?foo=123'

encode({ bar:'world' }, 'foo=hello&');
//=> 'foo=hello&bar=world'

decode('foo=hello&bar=1&bar=2&bar=3&baz=true');
//=> { foo:'hello', bar:[1,2,3], baz:true };
```


## API

### qss.encode(params, prefix)
Returns: `String`

Returns the formatted querystring.

#### params
Type: `Object`

The object that contains all query parameter keys & their values.

#### prefix
Type: `String`<br>
Default: `''`

An optional prefix. The stringified `params` will be appended to this value, so it must end with your desired joiner; eg `?`.

> **Important:** No checks or validations will run on your `prefix`. Similarly, no character is used to "glue" the query string to your `prefix` string.

### qss.decode(query)
Returns: `Object`

Returns an Object with decoded keys and values.

Repetitive keys will form an Array of its values. Also, `qss` will attempt to typecast `Boolean` and `Number` values.

#### query
Type: `String`

The query string, without its leading `?` character.

```js
qss.decode(
  location.search.substring(1) // removes the "?"
);
```


## Benchmarks

> Running Node v10.13.0

***Encode***

```
qss             x 1,112,341 ops/sec ±0.24% (96 runs sampled)
native          x 5,303,246 ops/sec ±0.76% (95 runs sampled)
querystringify  x   950,501 ops/sec ±0.76% (96 runs sampled)
query-string    x   347,603 ops/sec ±1.05% (92 runs sampled)
qs              x   733,449 ops/sec ±0.62% (97 runs sampled)
```

***Decode***

```
qss             x   443,667 ops/sec ±0.17% (95 runs sampled)
native          x   189,194 ops/sec ±0.44% (94 runs sampled)
querystringify  x   282,169 ops/sec ±0.26% (96 runs sampled)
query-string    x   191,334 ops/sec ±0.71% (95 runs sampled)
qs              x   168,165 ops/sec ±0.41% (93 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)
