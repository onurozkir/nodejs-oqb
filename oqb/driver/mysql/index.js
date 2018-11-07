const Adapters = () => {

    const get_query_builder = () => {
        const qb = require('./query/builder.js');
        return qb();
    };

    const get_query_executer = () => {
        const qe = require('./query/executer.js');
        return qe();
    };

    const get_query_compiler = () => {
        const qc = require('./query/compiler.js');
        return qc();
    };

    function Adapter() {
        this.qb = get_query_builder();
        this.qe = get_query_executer();
        this.qc = get_query_compiler();
        return Object.assign({
            connect: function () {
                return 'connect';
            }
        }, this.qb, this.qe, this.qc);
    }


    const determine_adapter = () => {
        return new Adapter();

    };

    return determine_adapter();

};


module.exports = Adapters;