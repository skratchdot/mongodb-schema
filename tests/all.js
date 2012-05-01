(function () {
	var t = db.jstests_all;
	var r = db.jstests_all_schema;
	t.drop();

	t.save( { name : { first : 'Jim', last : 'Smith' }, addresses : [] } );
	t.save( { name : { first : 'Amy', last : 'Smith' }, addresses : [{}] } );
	t.save( { name : { first : 'Bob', last : 'Smith' }, addresses : [{},{},{},{}] } );
	t.schema('jstests_all_schema');
	assert.eq(7, r.find().count());
	t.schema({out:'jstests_all_schema', arraysAreWildcards:false});
	assert.eq(10, r.find().count());

	t.drop();
	t.save( {} );
	t.save( { randomType : null } );
	t.save( { randomType : true } );
	t.save( { randomType : new Boolean(true) } );
	t.save( { randomType : false } );
	t.save( { randomType : 42 } );
	t.save( { randomType : NumberInt(42) } );
	t.save( { randomType : NumberLong(42) } );
	t.save( { randomType : undefined } );
	t.save( { randomType : 'foo' } );
	t.save( { randomType : new Date() } );
	t.save( { randomType : new Date().getTime() } );
	t.save( { randomType : {} } );
	t.save( { randomType : { foo : 'bar' } } );
	t.save( { randomType : [] } );
	t.save( { randomType : new Array() } );
	t.save( { randomType : [5,6,7] } );
	t.save( { randomType : [{},{foo:'bar'},{foo:12}] } );
	t.schema('jstests_all_schema');
	assert(5, r.find().count());
	assert(9, r.distinct('value.types').length);

	t.drop();
}());