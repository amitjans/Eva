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
	for (let key in obj) {
		if (typeof obj[key] === 'object') {
			obj[key] = await translateLocale(obj[key], source, target);
		} else {
			obj[key] = await social.translate(obj[key], target, source);
		}
		console.log('...Creando');
	}
	return obj;
}

async function updateLocale(obj, source, target) {
	for (const key in obj[source]) {
		if (typeof obj[source][key] === 'object') {
			let temp = {};
			temp[source] = obj[source][key];
			temp[target] = obj[target][key] || {};
			obj[target][key] = await updateLocale(temp, source, target);
		} else if (!obj[target][key]) {
			console.log(obj[source][key] + ' <---> ' + obj[target][key]);
			obj[target][key] = await social.translate(obj[source][key], target, source);
		}
	}
	console.log(obj[target]);
	return obj[target];
}

function writeLocale(target, obj) {
	console.log('./public/js/i18n/lang-' + target + '.js');
	writeFile('./public/js/i18n/lang-' + target + '.js',
	`const ${target} = ${JSON.stringify(obj, null, "\t").replace(/\t\"/gi, '\t').replace(/\":/gi, ':')}`, function (err) {
		if (err) throw err;
		console.log('Updated!');
	});
}

module.exports = router;
