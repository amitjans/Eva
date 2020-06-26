const f = require('../../vpl/ListeningFilters');
const filtercontroller = {};

filtercontroller.getList = async (req, res) => {
    let filters = [];
    for (var property in f) {
        if (typeof f[property] == 'function') {
            filters.push(property);
        }
    }
    res.status(200).json(filters);
}

module.exports = filtercontroller;