const Promise = require('bluebird');
const structs = require('./tables_structs');

const tableActions = {
	createTable: async function(knexClient, tableName) {
		return await knexClient.schema.createTable(tableName, function(t){
			const table = structs[tableName](t);
			console.log(`created table ${tableName}`);
			return table;
		}); 
	},

	isExist: async function(knexClient, tableName) {
		return await knexClient.schema.hasTable(tableName).then(function(exists){
			return exists;});
	},

	dropTable: async function(knexClient, tableName) {
		return await knexClient.schema.dropTable(tableName);
	},

	insertDataToTable: async function(knexClient, tableName, tableData) {
		return tableData.map(async function(data) {
			return await knexClient(tableName).insert(data);
		});
	},
};


const mockDatabase = {
	connection: null,
	knexClient: null,

	initialize: function(clientConnection) {
		if (this.connection != null){
			 return this.connection;
		}
		this.connection = clientConnection;
		this.knexClient = clientConnection.knex;
		console.log('DATABASE CONNECTION CONFIG', this.knexClient.context.client.config);

		return this.connection;
	},

	dropTables: function(tables) {
		const knexClient = this.knexClient;

		return Promise.each(tables, async function (tableName) {
			const isTableExist = await tableActions.isExist(knexClient, tableName);
			if(isTableExist){
				await tableActions.dropTable(knexClient, tableName);
			}
			return;
		});
	},

	createTables: function(tables) {
		const knexClient = this.knexClient;

		return Promise.each(tables, async function (tableName) {
			const isExist = await tableActions.isExist(knexClient, tableName);
			if(!isExist) {
				await tableActions.createTable(knexClient, tableName);
				return;
			} else {
				console.log(`table ${tableName} already exist`);
				return;
			}
		});
	},

	insertData: function(tables, data) {
		const knexClient = this.knexClient;

		return Promise.each(tables, async function(tableName) {
			const isTableExist = await tableActions.isExist(knexClient, tableName);
			if(!isTableExist) {
				await tableActions.createTable(knexClient, tableName); 
			}
			
			const tableData = data[tableName];

			tableActions.insertDataToTable(knexClient, tableName, tableData);
			return;
		});
	}
};

module.exports = {
	mockDatabase
};