import * as f from '../../vpl/ListeningFilters/index.js';

export const getList = async (req, res) => {
    let filters = [];
    for (var property in f) {
        if (typeof f[property] == 'function') {
            filters.push(property);
        }
    }
    res.status(200).json(filters);
}