export function encode(obj, pfx) {
	var k, i, tmp, str='';

	for (k in obj) {
		if ((tmp = obj[k]) !== void 0) {
			if (Array.isArray(tmp)) {
				for (i=0; i < tmp.length; i++) {
					str && (str += '&');
					str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp[i]);
				}
			} else {
				str && (str += '&');
				str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp);
			}
		}
	}

	return (pfx || '') + str;
}

function toValue(mix,tcBools,tcNumbers) {
	if (!mix) return '';
	var str = decodeURIComponent(mix);
	if (tcBools && str === 'false') return false;
	if (tcBools && str === 'true') return true;
	return (tcNumbers && +str * 0 === 0) ? (+str) : str;
}

export function decode(str,tcBools,tcNumbers) {
	var tmp, k, out={}, arr=str.split('&');
	tcBools = typeof tcBools !== 'undefined' ? tcBools : true;
	tcNumbers = typeof tcNumbers !== 'undefined' ? tcNumbers : true;

	while (tmp = arr.shift()) {
		tmp = tmp.split('=');
		k = tmp.shift();
		if (out[k] !== void 0) {
			out[k] = [].concat(out[k], toValue(tmp.shift(),tcBools,tcNumbers));
		} else {
			out[k] = toValue(tmp.shift(),tcBools,tcNumbers);
		}
	}

	return out;
}
