const fs = require('fs');
const mkdir = require('mk-dirs');
const sizer = require('gzip-size');
const pretty = require('pretty-bytes');
const { minify } = require('terser');
const pkg = require('./package');

let data = fs.readFileSync('src/index.js', 'utf8');

mkdir('dist').then(() => {
	// Copy as is for ESM
	fs.writeFileSync(pkg.module, data);

	// Minify & print gzip-size
	let { code } = minify(data, { toplevel:true });
	console.log(`> gzip size: ${pretty(sizer.sync(code))}`);

	let keys = [];
	// Mutate exports for CJS
	data = data.replace(/export function\s?(.+?)(?=\()/gi, (_, x) => {
		return keys.push(x) && `function ${x}`;
	});
	keys.sort().forEach(key => {
		data += `\nexports.${key} = ${key};`;
	});
	fs.writeFileSync(pkg.main, data + '\n');

	let name = pkg['umd:name'] || pkg.name;

	// Write UMD bundle
	let UMD = minify(`
	(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global['${name}'] = {})));
	}(this, (function (exports) {
		${data}
	})));`);

	fs.writeFileSync(pkg.unpkg, UMD.code);
});
