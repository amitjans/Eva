 function datafilter (obj, query, properties) {
    for (let prop of properties) {
        if (!!obj[prop]) {
            if (obj[prop].toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
    }
    return false;
}

function dataTableValues() {
    return { limit: '10', page: 0, maxpage: 0, from: 1, to: 10, q: '' };
}

function dataTable (listado, { page, maxpage, from, to, limit, q, temp }, way, ...properties) {
    if (way == 0) {
        temp = listado.filter(item => datafilter(item, q, properties));
        maxpage = (temp.length % limit == 0 ? temp.length / limit : Math.ceil(temp.length / limit));
    } else {
        if (page + way < 0 || page + way >= maxpage) {
            return { page: page, maxpage: maxpage, from: from, to: to, limit: limit, temp: temp };
        } else {
            page += way;
            from = page == 0 ? 1 : ((page * limit) + 1);
            to = from + parseInt(limit) - 1;
        }
    }
    
    to = (temp.length < to) ? temp.length : limit * (page + 1);
    from = from < to ? from : to < limit ? 1 : ((to / limit) * limit) + 1;

    return { page: page, maxpage: maxpage, from: from, to: to, limit: limit, temp: temp, sublist: temp.slice(from - 1, to) };
}