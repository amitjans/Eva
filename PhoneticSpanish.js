module.exports = function (word) {
	var temp = word.toUpperCase();
	temp = temp.replace(/A/gi, "");
	temp = temp.replace(/E/gi, "");
	temp = temp.replace(/I/gi, "");
	temp = temp.replace(/O/gi, "");
	temp = temp.replace(/U/gi, "");
	//Ini Variante
	temp = temp.replace(/Á/gi, "");
	temp = temp.replace(/É/gi, "");
	temp = temp.replace(/Í/gi, "");
	temp = temp.replace(/Ó/gi, "");
	temp = temp.replace(/Ú/gi, "");
	temp = temp.replace(/Ü/gi, "");
	//Fin Variante
	temp = temp.replace(/H/gi, "");
	temp = temp.replace(/W/gi, "");
	temp = temp.replace(/P/gi, "0");
	temp = temp.replace(/B/gi, "1");
	temp = temp.replace(/V/gi, "1");
	temp = temp.replace(/F/gi, "2");
	temp = temp.replace(/H/gi, "2");
	temp = temp.replace(/T/gi, "3");
	temp = temp.replace(/D/gi, "3");
	temp = temp.replace(/S/gi, "4");
	temp = temp.replace(/Z/gi, "4");
	temp = temp.replace(/C/gi, "4");
	temp = temp.replace(/X/gi, "4");
	temp = temp.replace(/LL/gi, "5");
	temp = temp.replace(/L/gi, "5");
	temp = temp.replace(/Y/gi, "5");
	temp = temp.replace(/N/gi, "6");
	temp = temp.replace(/Ñ/gi, "6");
	temp = temp.replace(/M/gi, "6");
	temp = temp.replace(/Q/gi, "7");
	temp = temp.replace(/K/gi, "7");
	temp = temp.replace(/G/gi, "8");
	temp = temp.replace(/J/gi, "8");
	temp = temp.replace(/RR/gi, "9");
	temp = temp.replace(/R/gi, "9");
	return temp;
}