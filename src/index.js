export function encode(obj, pfx) {
	let params = new URLSearchParams();

	Object.entries(obj).forEach(([k, v]) => {
		if (Array.isArray(v)) {
			for (let i = 0; i < v.length; i++) {
				params.append(k, v[i]);
			}
		} else {
			params.append(k, v);
		}
	});

	return `${(pfx || '')}${params}`;
}

function toValue(str) {
	if (!str) return '';
	if (str === 'false') return false;
	if (str === 'true') return true;
	return (+str * 0 === 0) ? (+str) : str;
}

export function decode(str) {
	let out = {};

	(new URLSearchParams(str)).forEach((v, k) => {
		if (out[k] !== undefined) {
			out[k] = [].concat(out[k], toValue(v));
		} else {
			out[k] = toValue(v);
		}
	});

	return out;
}
