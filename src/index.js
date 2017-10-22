var enc = encodeURIComponent;

function append(out, key, val) {
	return (out ? '&' : '') + enc(key) + '=' + enc(val);
}

export default function (obj, pfx) {
	var k, i, tmp, str='';
	for (k in obj) {
		if (tmp = obj[k]) {
			if (Array.isArray(tmp)) {
				for (i=0; i < tmp.length; i++) {
					str += append(str, k, tmp[i]);
				}
			} else {
				str += append(str, k, tmp)
			}
		}
	}
	return (pfx || '') + str;
}
