const express = require('express');
var router = express.Router();
var { writeFile } = require('fs');

router.post('/locale', async function (req, res) {
	res.status(200).jsonp();
	let obj = await translateLocale(req.body, req.query.source, req.query.target);
	writeLocale(req.query.target, obj);
});

router.put('/locale', async function (req, res) {
	res.status(200).jsonp();
	let obj = await updateLocale(req.body, req.query.source, req.query.target);
	writeLocale(req.query.target, obj);
});

async function translateLocale(obj, source, target) {
	let arr = Object.keys(obj);
	for (let i = 0; i < arr.length; i++) {
		if (typeof obj[arr[i]] === 'object') {
			obj[arr[i]] = await translateLocale(obj[arr[i]], source, target);
		} else {
			obj[arr[i]] = await social.translate(obj[arr[i]], target, source);
		}
		console.log('...Creando');
	}
	return obj;
}

async function updateLocale(obj, source, target) {
	let arr = Object.keys(obj[source]);
	for (let i = 0; i < arr.length; i++) {
		if (typeof obj[source][arr[i]] === 'object') {
			let temp = {};
			temp[source] = obj[source][arr[i]];
			temp[target] = obj[target][arr[i]] || {};
			obj[target][arr[i]] = await updateLocale(temp, source, target);
		} else {
			console.log(obj[target][arr[i]]);
			obj[target][arr[i]] = obj[target][arr[i]] || await social.translate(obj[source][arr[i]], target, source);
			console.log(obj[target][arr[i]]);
			console.log('*------------*');
		}
		console.log('...Actualizando');
	}
	return obj[target];
}

function writeLocale(target, obj) {
	writeFile('./public/js/i18n/lang-' + target + '.js',
	`const ${target} = ${JSON.stringify(obj, null, "\t").replace(/\t\"/gi, '\t').replace(/\":/gi, ':')}`, function (err) {
		if (err) throw err;
		console.log('Updated!');
	});
}

module.exports = router;
