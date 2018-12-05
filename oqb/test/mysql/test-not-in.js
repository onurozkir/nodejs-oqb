const should = require('chai').should();
const expect = require('chai').expect;
const MysqlQueryBuilder = require('./../../oqb.js');


describe('QueryBuilder for Mysql (WHERE NOT IN) compiler', function () {
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
        oqb.where_not_in.should.be.a('function');

    });

    it('should use with two parameter', () => {
        expect(() => oqb.where_not_in(), '2 parametre lazım').to.throw(Error);
    });

    it('should first parameter string, second parameter string', () => {
        oqb.resetQuery();
        oqb.where_not_in('author', 'John Hathorne');
        oqb.where_array.should.eql(["`author` NOT IN ( 'John Hathorne' )"]);

    });

    it('should first parameter string, second parameter array', () => {
        oqb.resetQuery();
        oqb.where_not_in('description', ["Abigail Hobbs", "Ann Sears", "Thomas Danforth"]);
        oqb.where_array.should.eql(["`description` NOT IN ( 'Abigail Hobbs', 'Ann Sears', 'Thomas Danforth' )"]);
    });

    it('should first parameter array, second parameter string', () => {
        oqb.resetQuery();
        oqb.where_not_in(["author", "book_name", "description"], 'John Hathorne');
        oqb.where_array.should.eql(["`author` NOT IN ( 'John Hathorne' ) AND `book_name` NOT IN ( 'John Hathorne' ) AND `description` NOT IN ( 'John Hathorne' )"]);
    });

    it('should first parameter array, second parameter array', () => {
        oqb.resetQuery();
        oqb.where_not_in(["author", "book_name", "description"], ["Abigail Hobbs", ["Ann Sears", "Thomas Danforth"], "Thomas Danforth"]);
        oqb.where_array.should.eql(["`author` NOT IN ( 'Abigail Hobbs' ) AND `book_name` NOT IN ( 'Ann Sears', 'Thomas Danforth' ) AND `description` NOT IN ( 'Thomas Danforth' )"]);
    });


});