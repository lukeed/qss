const qs = require('qs');
const native = require('querystring');
const { Suite } = require('benchmark');
const queryString = require('query-string');
const querystringify = require('querystringify');
const { encode, decode } = require('../dist/qss');

const foo = new Suite();
const bar = new Suite();

const obj = { foo:123, bar:[4,5,6] };
const str = 'foo=123&bar=4&bar=5&bar=6&baz=true';

console.log('\nEncode:');
foo
	.add('qs             ', () => qs.stringify(obj))
	.add('querystringify ', () => querystringify.stringify(obj))
	.add('query-string   ', () => queryString.stringify(obj))
	.add('native         ', () => native.stringify(obj))
	.add('qss            ', () => encode(obj))
	.on('cycle', e => console.log(String(e.target)))
	.run();

console.log('\nDecode:');
bar
	.add('qs             ', () => qs.parse(str))
	.add('querystringify ', () => querystringify.parse(str))
	.add('query-string   ', () => queryString.parse(str))
	.add('native         ', () => native.parse(str))
	.add('qss            ', () => decode(str))
	.on('cycle', e => console.log(String(e.target)))
	.run();
