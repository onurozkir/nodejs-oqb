const Adapters = () => {

    const get_query_builder = () => {
        const qb = require('./query/builder.js');
        return qb();
    };

    function Adapter() {
        this.qb = get_query_builder();
        return Object.assign({
                connect: function () {
                    return 'connect';
                }
            }, this.qb
        );
    }


    const determine_adapter = () => {
        return new Adapter();

    };

    return determine_adapter();

};


module.exports = Adapters;