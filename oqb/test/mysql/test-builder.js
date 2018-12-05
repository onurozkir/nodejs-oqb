const should = require('chai').should();
const expect = require('chai').expect;
const MysqlQueryBuilder = require('./../../oqb.js');

describe('QueryBuilder for Mysql', function () {
    it('should exists', () => {
        should.exist(MysqlQueryBuilder);
    });
    it('should be a function', () => {
        MysqlQueryBuilder.should.be.a('function');
    });

    it('should be a function', () => {
        MysqlQueryBuilder.should.be.a('function');
    });


});