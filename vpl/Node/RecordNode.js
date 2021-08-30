const fs = require('fs');

module.exports = {
    RecordNode: async function ({ time }) {
        let dir = './temp/' + formatDate(new Date(), "yyyymmdd");
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } catch (err) {
            console.error(err);
        }
        await social.recordSound(time, `${dir}/${formatDate(new Date(), "yyyymmddThhMMss")}.wav`);
    }
}

function formatDate(date, format) {
    const map = {
        mm: (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1),
        dd: (date.getDate() < 10 ? "0" : "") + date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear(),
        hh: date.getHours(),
        MM: (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
        ss: (date.getSeconds() < 10 ? "0" : "") + date.getSeconds(),
        
    }

    return format.replace(/mm|dd|yyyy|yy|hh|MM|ss/g, matched => map[matched]);
}