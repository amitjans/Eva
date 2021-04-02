 function datafilter (obj, query, ...properties) {
    for (let i = 0; i < properties.length; i++) {
        if (!!obj[properties[i]]) {
            if (obj[properties[i]].toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
    }
    return false;
}