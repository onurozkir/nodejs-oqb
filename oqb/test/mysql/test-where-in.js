const should = require('chai').should();
const expect = require('chai').expect;
const MysqlQueryBuilder = require('./../../oqb.js');


describe('QueryBuilder for Mysql (WHERE IN) compiler', function () {
    const oqb = new MysqlQueryBuilder({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'queryBuilderTest'
        }
    });

    it('should be exists Query Builder', () => {
        should.exist(MysqlQueryBuilder);
    });


    it('should be a function', () => {
        oqb.where_in.should.be.a('function');

    });

    it('should use with two parameter', () => {
        expect(() => oqb.where_in(), '2 parametre lazım').to.throw(Error);
    });

    it('should first parameter string, second parameter string', () => {
        oqb.resetQuery();
        oqb.where_in('author', 'John Hathorne');
        oqb.where_array.should.eql(["`author` IN ( 'John Hathorne' )"]);

    });

    it('should first parameter string, second parameter array', () => {
        oqb.resetQuery();
        oqb.where_in('description', ["Abigail Hobbs", "Ann Sears", "Thomas Danforth"]);
        oqb.where_array.should.eql(["`description` IN ( 'Abigail Hobbs', 'Ann Sears', 'Thomas Danforth' )"]);
    });

    it('should first parameter array, second parameter string', () => {
        oqb.resetQuery();
        oqb.where_in(["author", "book_name", "description"], 'John Hathorne');
        oqb.where_array.should.eql(["`author` IN ( 'John Hathorne' ) AND `book_name` IN ( 'John Hathorne' ) AND `description` IN ( 'John Hathorne' )"]);
    });

    it('should first parameter array, second parameter array', () => {
        oqb.resetQuery();
        oqb.where_in(["author", "book_name", "description"], ["Abigail Hobbs", ["Ann Sears", "Thomas Danforth"], "Thomas Danforth"]);
        oqb.where_array.should.eql(["`author` IN ( 'Abigail Hobbs' ) AND `book_name` IN ( 'Ann Sears', 'Thomas Danforth' ) AND `description` IN ( 'Thomas Danforth' )"]);
    });


    it('should first parameter string, second parameter query', () => {
        oqb.resetQuery();
        oqb.where_in("author", {select: 'name', from: 'customer', where: 'name = "Red Night" and age > 50'});
        oqb.where_array.should.eql(["`author` IN ( SELECT DISTINCT `name` FROM `customer` WHERE name = 'Red Night' AND age > 50)"]);
    });


});