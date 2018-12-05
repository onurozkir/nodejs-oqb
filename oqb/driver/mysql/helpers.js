"use strict";


module.exports.selectBuilder = (qb) => {
    return qb.select_array.join(', ');
};

module.exports.fromBuilder = (qb) => {
    return ' FROM ' + qb.from_array.join(', ');
};

module.exports.whereBuilder = (qb) => {
    return ' WHERE ' + qb.where_array.join(' AND ');
};

module.exports.clearSql = (item) => {
    if (typeof item === 'string') {
        item.replace(/\s/g, "");
    } else if (Array.isArray(item)) {
        item.length = 0;
    }

};

module.exports.escape_in_args = (item) => {
    if (typeof item !== 'string') throw new Error('escape_in_args string alır');
    return "'" + item.trim() + "'";
};

module.exports.escape_table_parse = (item) => {
    if (typeof item !== 'string') throw new Error('escape_table_parse string alır');
    return "`" + item.trim() + "`";
};

module.exports.isOperator = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const match = /(<|>|!|=|\sIS NULL|\sIS NOT NULL|\sEXISTS|\sBETWEEN|\sLIKE|\sCASE|\sTHEN|\sWHEN|\sIN\s*\(|\s)/i.test(str.trim().toUpperCase());
        if (!match) {
            return false;
        }
    }
    return true;
};

module.exports.escape_string = (item) => {
    if (item === '') return item;

    item = item.trim();

    if (item.indexOf('(') !== -1 || item.indexOf("'") !== -1) {
        const has_alias = item.lastIndexOf(')');
        let alias;
        if (has_alias >= 0) {
            alias = item.substr(has_alias + 1).replace(/\sAS\s/i, '').trim();
            if (alias !== '')
                alias = ' AS ' + alias;
            item = item.substr(0, has_alias + 1);
        } else {
            alias = '';
        }
        return item + alias;
    }

    if (item.indexOf('.') !== -1) {
        const compoundParts = item.split('.');
        let tableName = '`' + compoundParts[0].trim() + '`';
        let asFrom;
        if (compoundParts[1] === '*') asFrom = '*';
        if (compoundParts[1].indexOf(' ') !== -1) {
            let hasAs = compoundParts[1].split(' ');
            asFrom = '.`' + hasAs[0].trim() + '`' + (this.isOperator(hasAs[1]) ? ' ' + hasAs[1].toUpperCase() : ' AS') + " " + hasAs.slice(-1)[0];
        } else {
            asFrom = '.`' + compoundParts[1].trim() + '`';
        }
        return tableName + asFrom;
    }

    if (item.indexOf(' ') !== -1) {
        const withAliasParts = item.split(' ');
        if (withAliasParts.length === 2) {
            return '`' + withAliasParts[0].trim() + '` AS ' + withAliasParts[1].trim().toUpperCase();
        }
    }

    return item;
};

module.exports.upperObjectKey = (type, obj) => {

    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newObj = {};
    while (n--) {
        key = keys[n];
        if (type == 'upper') {
            newObj[key.toUpperCase()] = obj[key];
        } else if (type == 'lower') {
            newObj[key.toLowerCase()] = obj[key];
        }

    }

    return newObj;

};




