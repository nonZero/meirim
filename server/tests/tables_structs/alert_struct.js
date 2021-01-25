const AlertStruct = function(table) {
	table.increments();
	table.integer('person_id');
	table.string('address');
	table.integer('radius');
	table.specificType('geom', 'GEOMETRY');
	table.string('type');
	table.string('place');
	return table;
};

module.exports = AlertStruct;