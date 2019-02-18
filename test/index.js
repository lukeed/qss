const test = require('tape');
const q = require('querystring');
const qss = require('../dist/qss');

const { stringify, parse } = q;
const { encode, decode } = qss;

test('qss', t => {
	t.is(typeof qss, 'object', 'exports a object');
	t.is(typeof qss.encode, 'function', '~> has "encode" function');
	t.is(typeof qss.decode, 'function', '~> has "decode" function');
	t.end();
});

test('(encode) simple', t => {
	let obj = { foo:123 };
	let out = encode(obj);
	t.is(out, 'foo=123', 'returns expected value');
	t.is(out, stringify(obj), 'matches native value');
	t.is(typeof out, 'string', 'returns a string');
	t.end();
});

test('(encode) simple - multiple', t => {
	let obj = { foo:123, bar:456 };
	let out = encode(obj);
	t.is(out, 'foo=123&bar=456', 'returns expected value');
	t.is(out, stringify(obj), 'matches native value');
	t.end();
});

test('(encode) boolean', t => {
	let obj = { foo:true, bar:false };
	let out = encode(obj);
	t.is(out, 'foo=true&bar=false', 'returns expected value');
	t.is(out, stringify(obj), 'matches native value');
	t.end();
});

test('(encode) array', t => {
	let obj = { foo:[1,2,3] };
	let out = encode(obj);
	t.is(out, 'foo=1&foo=2&foo=3', 'returns expected value');
	t.is(out, stringify(obj), 'matches native value');
	t.end();
});

test('(encode) array - multiple', t => {
	let obj = { foo:[1,2,3], bar:[4,5,6] };
	let out = encode(obj);
	t.is(out, 'foo=1&foo=2&foo=3&bar=4&bar=5&bar=6', 'returns expected value');
	t.is(out, stringify(obj), 'matches native value');
	t.end();
});

test('(encode) array - nested', t => {
	let obj = { foo:[ 1,[2],3] };
	let val = stringify(obj);
	let out = encode(obj);
	t.is(out, 'foo=1&foo=2&foo=3', 'returns expected value');
	t.is(val, 'foo=1&foo=&foo=3', '>> assert native value, for reference');
	t.not(out, val, 'does NOT match native value');
	t.end();
});

test('(encode) prefix', t => {
	let foo = encode({ foo:123, bar:'baz' }, '?');
	t.is(foo, '?foo=123&bar=baz', 'treats second args as prefix');
	let bar = encode({ foo:123 }, false);
	t.is(bar, 'foo=123', 'ignores falsey prefixes');
	let baz = encode({ foo:123 }, 'http://baz.com/a/b/c?');
	t.is(baz, 'http://baz.com/a/b/c?foo=123', 'keeps entire prefix');
	t.end();
});

test('(decode) simple', t => {
	let str = 'foo=foo&bar=bar1&bar=bar2';
	let out = decode(str);
	t.is(typeof out, 'object', 'returns an object');
	t.same(out, { foo:'foo', bar:['bar1', 'bar2'] }, '~> is expected value');
	t.same(out, parse(str), 'matches native value');
	t.end();
});

test('(decode) numbers', t => {
	let str = 'foo=1&bar=1&bar=2&baz=0';
	let out = decode(str);
	let val = parse(str);
	t.is(typeof out, 'object', 'returns an object');
	t.same(out, { foo:1, bar:[1, 2], baz:0 }, '~> is expected value');
	t.same(val, { foo:'1', bar:['1', '2'], baz: '0' }, '>> assert native value, for reference');
	t.not(out, val, 'does NOT match native value');
	t.end();
});

test('(decode) floats', t => {
	let str = 'foo=1&bar=1.3&bar=2.01&bar=2.0&baz=19.111';
	let out = decode(str);
	let val = parse(str);
	t.is(typeof out, 'object', 'returns an object');
	t.same(out, { foo:1, bar:[1.3, 2.01, 2.0], baz: 19.111 }, '~> is expected value');
	t.same(val, { foo:'1', bar:['1.3', '2.01', '2.0'], baz:'19.111' }, '>> assert native value, for reference');
	t.not(out, val, 'does NOT match native value');
	t.end();
});

test('(decode) booleans', t => {
	let str = 'foo=true&bar=false&bar=true';
	let out = decode(str);
	let val = parse(str);
	t.is(typeof out, 'object', 'returns an object');
	t.same(out, { foo:true, bar:[false, true] }, '~> is expected value');
	t.same(val, { foo:'true', bar:['false', 'true'] }, '>> assert native value, for reference');
	t.not(out, val, 'does NOT match native value');
	t.end();
});
