const Helper = require('../helpers');

function QueryBuilder() {

    this.select_array = [];

    this.from_array = [];

    this.where_array = [];

    this.select = (select) => {
        if (typeof select === "string") {
            select = select.split(',');
            for (let i in select) {
                const val = select[i].trim();
                if (val !== '')
                    this.select_array.push(Helper.escape_string(val));
            }
        } else if (Array.isArray(select)) {
            if (select.length === 0) this.select_array.push('*');
            for (let i in select) {
                this.select_array.push(Helper.escape_string(select[i]));
            }
        }

        return this;
    };

    this.get = () => {
        let sql = 'SELECT ';
        sql += Helper.selectBuilder(this)
            + Helper.fromBuilder(this)
            + Helper.whereBuilder(this);
        return sql.toUpperCase();
    };

    this.resetQuery = () => {
        Helper.clearSql(this.select_array);
        Helper.clearSql(this.from_array);
        Helper.clearSql(this.where_array);
    };

    this.from = (table) => {
        this.from_array.push(table);
        return this;
    };

    this.where_not_in = (type, notInArgs) => {
        if (typeof type === 'undefined' || typeof notInArgs === 'undefined') throw new Error('2 parametre lazım');
        let argsArray = [];
        if (typeof type === 'string') {
            if (typeof notInArgs === 'string') {
                this.where_array.push(Helper.escape_table_parse(type) + " NOT IN ( " + Helper.escape_in_args(notInArgs) + " )");
            } else {
                for (let i in notInArgs) {
                    argsArray.push(Helper.escape_in_args(notInArgs[i]));
                }
                this.where_array.push(Helper.escape_table_parse(type) + " NOT IN ( " + argsArray.join(', ') + " )");
            }
        }

        if (Array.isArray(type)) {
            if (typeof notInArgs === 'string') {
                for (let i in type) {
                    argsArray.push(Helper.escape_table_parse(type[i]) + " NOT IN ( " + Helper.escape_in_args(notInArgs) + " )");
                }
                this.where_array.push(argsArray.join(' AND '));
            } else {
                let typeArray = [];
                for (let i in type) {
                    argsArray = [];
                    if (typeof notInArgs[i] === 'string') {
                        argsArray.push(Helper.escape_in_args(notInArgs[i]));
                    } else {
                        for (let k in notInArgs[i]) {
                            argsArray.push(Helper.escape_in_args(notInArgs[i][k]));
                        }
                    }
                    typeArray.push(Helper.escape_table_parse(type[i]) + " NOT IN ( " + argsArray.join(', ') + " )");
                }
                this.where_array.push(typeArray.join(' AND '));
            }
        }

        return this;

    };

    this.where_in = (type, inArgs) => {
        if (typeof type === 'undefined' || typeof inArgs === 'undefined') throw new Error('2 parametre lazım');
        if (typeof type === 'string') {
            if (typeof inArgs === 'string') {
                this.where_array.push(Helper.escape_table_parse(type) + " IN ( " + Helper.escape_in_args(inArgs) + " )");
            } else if (Array.isArray(inArgs)) {
                let argsArray = [];
                for (let i in inArgs) {
                    argsArray.push(Helper.escape_in_args(inArgs[i]));
                }
                this.where_array.push(Helper.escape_table_parse(type) + " IN ( " + argsArray.join(', ') + " )");
            } else if (typeof inArgs === 'object') {
                let in_args = Helper.upperObjectKey('upper', inArgs);
                if (['SELECT', 'FROM', 'WHERE'].filter(x => !Object.keys(in_args).includes(x)).length > 0) {
                    throw new Error(`eksik alanları var`);
                }
                if (in_args["SELECT"].trim().split(',').length > 1) throw new Error('select tek alan olabilir');
                let where_str_args = [];
                for (let i in in_args["WHERE"].split('and')) {
                    where_str_args.push(in_args["WHERE"].split('and')[i].replace("\"", "'"));
                }
                this.where_array.push(Helper.escape_table_parse(type) + " IN ( " + `SELECT DISTINCT ${Helper.escape_string(in_args['SELECT'])} FROM ${Helper.escape_table_parse(in_args["FROM"])} WHERE ${where_str_args.join(' and ')}` + " )");
            }
        }

        if (Array.isArray(type)) {
            let argsArray = [];
            if (typeof inArgs === 'string') {
                for (let i in type) {
                    argsArray.push(Helper.escape_table_parse(type[i]) + " IN ( " + Helper.escape_in_args(inArgs) + " )");
                }
                this.where_array.push(argsArray.join(' AND '));
            } else {
                let typeArray = [];
                for (let i in type) {
                    argsArray = [];
                    if (typeof inArgs[i] === 'string') {
                        argsArray.push(Helper.escape_in_args(inArgs[i]));
                    } else {
                        for (let k in inArgs[i]) {
                            argsArray.push(Helper.escape_in_args(inArgs[i][k]));
                        }
                    }
                    typeArray.push(Helper.escape_table_parse(type[i]) + " IN ( " + argsArray.join(', ') + " )");
                }
                this.where_array.push(typeArray.join(' AND '));
            }
        }

        return this;

    };

    this.with_alias = (alias) => {
        if (typeof alias !== 'object') throw new Error('withAlias object alır');
        let aliasArray = [];
        for (let i in alias) {
            aliasArray.push(Helper.escape_string(i.trim() + ' ' + alias[i].trim().toUpperCase()));
        }
        return this;
    };

    this.helper_block = {
        not_in: (type, notInArgs) => {
            if (typeof type === 'undefined' || typeof notInArgs === 'undefined') throw new Error('2 parametre lazım');
            let argsArray = [];
            if (typeof type === 'string') {
                if (typeof notInArgs === 'string') {
                    return (Helper.escape_table_parse(type) + " NOT IN ( " + Helper.escape_in_args(notInArgs) + " )");
                } else {
                    for (let i in notInArgs) {
                        argsArray.push(Helper.escape_in_args(notInArgs[i]));
                    }
                    return (Helper.escape_table_parse(type) + " NOT IN ( " + argsArray.join(', ') + " )");
                }
            }

            if (Array.isArray(type)) {
                if (typeof notInArgs === 'string') {
                    for (let i in type) {
                        argsArray.push(Helper.escape_table_parse(type[i]) + " NOT IN ( " + Helper.escape_in_args(notInArgs) + " )");
                    }
                    return argsArray.join(' AND ');
                } else {
                    let typeArray = [];
                    for (let i in type) {
                        argsArray = [];
                        if (typeof notInArgs[i] === 'string') {
                            argsArray.push(Helper.escape_in_args(notInArgs[i]));
                        } else {
                            for (let k in notInArgs[i]) {
                                argsArray.push(escape_in_args(notInArgs[i][k]));
                            }
                        }
                        typeArray.push(Helper.escape_table_parse(type[i]) + " NOT IN ( " + argsArray.join(', ') + " )");
                    }
                    return typeArray.join(' AND ');
                }
            }

        }
    };

    return this;
}


module.exports = QueryBuilder;