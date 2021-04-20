 function datafilter (obj, query, properties) {
    for (let i = 0; i < properties.length; i++) {
        if (!!obj[properties[i]]) {
            if (obj[properties[i]].toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
    }
    return false;
}

function dataTableValues() {
    return { limit: '10', page: 0, maxpage: 0, from: 1, to: 10, q: '' };
}

function dataTable (listado, obj, way, ...properties) {
    if (way == 0) {
        obj.temp = [];
        for (let i = 0; i < listado.length; i++) {
            if (datafilter(listado[i], obj.q, properties)) {
                obj.temp.push(listado[i]);
            }
        }
        obj.maxpage = (obj.temp.length % obj.limit == 0 ? obj.temp.length / obj.limit : Math.ceil(obj.temp.length / obj.limit));
    } else {
        if (obj.page + way < 0 || obj.page + way >= obj.maxpage) {
            return { page: obj.page, maxpage: obj.maxpage, from: obj.from, to: obj.to, limit: obj.limit, temp: obj.temp };
        } else {
            obj.page += way;
            obj.from = obj.page == 0 ? 1 : ((obj.page * obj.limit) + 1);
            obj.to = obj.from + parseInt(obj.limit) - 1;
        }
    }
    
    obj.to = (obj.temp.length < obj.to) ? obj.temp.length : obj.limit * (obj.page + 1);
    obj.from = obj.from < obj.to ? obj.from : obj.to < obj.limit ? 1 : ((obj.to / obj.limit) * obj.limit) + 1;

    let sublist = obj.temp.slice(obj.from - 1, obj.to);

    return { page: obj.page, maxpage: obj.maxpage, from: obj.from, to: obj.to, limit: obj.limit, temp: obj.temp, sublist: sublist };
}