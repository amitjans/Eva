function newlocale(target, source) {
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

function updatelocale(target, source) {
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