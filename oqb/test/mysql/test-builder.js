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
    // it('should have all the MysqlQueryBuilder methods', () => {
    //     const mysqlOqb = MysqlQueryBuilder(Object.assign({}, settings), driver);
    //     const children = [
    //         'where_array', 'where_in_array', 'from_array', 'join_array', 'select_array', 'set_array', 'order_by_array', 'group_by_array', 'having_array',
    //         'limit_to', 'offset_val',
    //         'join_clause',
    //         'last_query_string',
    //         'distinct_clause',
    //         'with_alias',
    //         'reset_query',
    //         'where', 'or_where', 'where_in', 'or_where_in',
    //         'where_not_in', 'or_where_not_in',
    //         'like', 'not_like', 'or_like', 'or_not_like',
    //         'from', 'join',
    //         'select', 'select_min', 'select_max', 'select_avg', 'select_sum', 'distinct',
    //         'group_by', 'having', 'or_having', 'order_by', 'limit', 'offset', 'set'];
    //     expect(mysqlOqb).to.include.keys(children);
    // });


});