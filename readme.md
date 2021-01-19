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

The query string, with or without its leading `?` character.

```js
qss.decode(
  location.search.substring(1) // removes the "?"
);
```


## Benchmarks

> Running Node v14.5.0

***Encode***

```
qss             x 1,151,789 ops/sec ±0.66% (89 runs sampled)
native          x 4,432,282 ops/sec ±1.47% (90 runs sampled)
querystringify  x   644,980 ops/sec ±0.70% (93 runs sampled)
query-string    x   209,326 ops/sec ±0.63% (94 runs sampled)
qs              x   514,285 ops/sec ±0.68% (89 runs sampled)
```

***Decode***

```
qss             x   504,873 ops/sec ±3.95% (87 runs sampled)
native          x 1,148,267 ops/sec ±0.68% (94 runs sampled)
querystringify  x   193,010 ops/sec ±0.94% (91 runs sampled)
query-string    x   138,808 ops/sec ±1.15% (90 runs sampled)
qs              x   137,275 ops/sec ±0.77% (94 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)
