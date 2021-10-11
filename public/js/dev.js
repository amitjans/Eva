function newlocale(target, source = 'es') {
    $.ajax({
        method: "POST",
        url: `dev/locale/?target=${target}&source=${source}`,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(lang[source])
    })
    .done(function (msg) { 
        notify('Ok');
    });
}

function updatelocale(target, source = 'es') {
    let temp = {};
    temp[target] = lang[target];
    temp[source] = lang[source];
    $.ajax({
        method: "PUT",
        url: `dev/locale/?target=${target}&source=${source}`,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(temp)
    })
    .done(function (msg) { 
        notify('Ok');
    });
}

function rosco(data) {
    let abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $.ajax({
            method: "POST",
            url: `/api/common?db=scriptdata`,
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                campo1: equalsIgnoringCase(element.respuesta[0], abecedario[i]) ? abecedario[i].toUpperCase() : `Contiene la ${abecedario[i].toUpperCase()}`,
                campo2: element.pregunta,
                campo3: capitalize(element.respuesta),
                campo4: abecedario[i].toUpperCase(),
                script: '7b711eab-20cb-4ebc-bc46-51752003b8b8'
            })
        }).done(function (msg) {
        });
    }

}

function capitalize([first, ...rest]) {
    return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
}