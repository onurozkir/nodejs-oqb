const Oqb = (settings) => {
    this.settings = Object.assign({}, settings);
    this.settings.client = settings.client || 'mysql';
    this.settings.connection.driver_version = settings.connection.driver_version || 'default';
    this.driver_info = null;
    const set_oqb = (oqb) => {
        if (typeof oqb.settings !== 'object') throw new Error("Obje olmalı");

        if (oqb.settings.connection.driver_version !== 'default' && Number.isInteger(oqb.settings.connection.driver_version))
            throw new Error("driver_version integer ya da default olmalı");

        this.settings.client = oqb.settings.client.toLowerCase();
    };

    set_oqb(this);


    const adapter = (oqb) => {
        const Adapters = require('./driver/' + oqb.settings.client + '/index.js');
        return Adapters();
    };

    return adapter(this);

};


module.exports = Oqb;

