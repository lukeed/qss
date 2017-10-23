const test = require('tape');
const q = require('querystring');
const fn = require('../dist/qss');

const native = q.stringify;

test('qss', t => {
	t.is(typeof fn, 'function', 'exports a function');
	t.end();
});

test('simple', t => {
	let obj = { foo:123 };
	let out = fn(obj);
	t.is(out, 'foo=123', 'returns expected value');
	t.is(out, native(obj), 'matches native value');
	t.is(typeof out, 'string', 'returns a string');
	t.end();
});

test('simple - multiple', t => {
	let obj = { foo:123, bar:456 };
	let out = fn(obj);
	t.is(out, 'foo=123&bar=456', 'returns expected value');
	t.is(out, native(obj), 'matches native value');
	t.end();
});

test('array', t => {
	let obj = { foo:[1,2,3] };
	let out = fn(obj);
	t.is(out, 'foo=1&foo=2&foo=3', 'returns expected value');
	t.is(out, native(obj), 'matches native value');
	t.end();
});

test('array - multiple', t => {
	let obj = { foo:[1,2,3], bar:[4,5,6] };
	let out = fn(obj);
	t.is(out, 'foo=1&foo=2&foo=3&bar=4&bar=5&bar=6', 'returns expected value');
	t.is(out, native(obj), 'matches native value');
	t.end();
});

test('array - nested', t => {
	let obj = { foo:[ 1,[2],3] };
	let val = native(obj);
	let out = fn(obj);
	t.is(out, 'foo=1&foo=2&foo=3', 'returns expected value');
	t.is(val, 'foo=1&foo=&foo=3', '>> assert native value, for reference');
	t.not(out, val, 'does NOT match native value');
	t.end();
});

test('prefix', t => {
	let foo = fn({ foo:123, bar:'baz' }, '?');
	t.is(foo, '?foo=123&bar=baz', 'treats second args as prefix');
	let bar = fn({ foo:123 }, false);
	t.is(bar, 'foo=123', 'ignores falsey prefixes');
	let baz = fn({ foo:123 }, 'http://baz.com/a/b/c?');
	t.is(baz, 'http://baz.com/a/b/c?foo=123', 'keeps entire prefix');
	t.end();
});
