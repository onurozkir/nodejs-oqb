const compiler = require('./compiler.js');
const executer = require('./executer.js');
const BuilderQuery = function () {
    const test = (oqb) => {
        return oqb.select_array[0] + " - " + oqb.from_array[0];
    };

    this.select_array = [];
    this.from_array = [];
    this.where_array = [];

    this.select = (select) => {
        this.select_array.push(select);
        return this;
    };

    this.withAlias = (select) => {
        if (typeof select !== 'object') throw Error('With alias object alır');
        return select + " -> " + alias;
    };

    this.get = () => {
        return test(this);
    };
    this.from = (table) => {
        this.from_array.push(table);
        return this;
    };


    return this;
};

module.exports = BuilderQuery;