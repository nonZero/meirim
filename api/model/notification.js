const Model = require('./base_model');
const Exception = require('./exception');

const createNotificationsFor = function({ users, planId, type }) {
	return users.map(function(user) {
		const data = {
			person_id: user.id,
			plan_id: planId,
			type,
		};
		const instance = new Notification(data);
	 	return instance.save();
	});
};

class Notification extends Model {
	get rules() {
		return {
			person_id: ['required', 'integer'],
			plan_id: ['required', 'integer'],
			seen: 'boolean',
			type: ['required', 'string']
		};
	}	

	get tableName() {
		return 'notification';
	}

	get hasTimestamps() {
		return true;
	}

	defaults() {
		return {
			seen: false 
		};
	}

	static canCreate(session) {
		if (!session.person) {
			throw new Exception.NotAllowed('Must be logged in');
		}
		return Promise.resolve(this);
	}
}

module.exports = { Notification, createNotificationsFor };
