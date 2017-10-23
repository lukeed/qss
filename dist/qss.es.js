var enc = encodeURIComponent;

function append(out, key, val) {
	return (out ? '&' : '') + enc(key) + '=' + enc(val);
}

var index = function (obj, pfx) {
	var k, i, tmp, str='';
	for (k in obj) {
		if ((tmp = obj[k]) !== void 0) {
			if (Array.isArray(tmp)) {
				for (i=0; i < tmp.length; i++) {
					str += append(str, k, tmp[i]);
				}
			} else {
				str += append(str, k, tmp);
			}
		}
	}
	return (pfx || '') + str;
};

export default index;
