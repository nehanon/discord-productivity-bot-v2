const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memberSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now()
	},
	memberId: {
		type: String,
		unique: true,
		required: true
	},
	guildId: {
		type: String,
		required: true
	},
	activeTrack: {
		type: String,
		default: 'track1',
		enum: ['track1', 'track2', 'track3', 'track4']
	},
	activeAdventure: {
		type: String
	},
	activeCategory: {
		type: Schema.Types.Mixed,
		default: null,
		enum: ['reading', 'studying', 'exercise', 'chores', 'work', 'hobbies', 'other', null]
	},
	tallies: {
		track1: {
			type: Number
		},
		track2: {
			type: Number
		},
		track3: {
			type: Number
		},
		track4: {
			type: Number
		},
	},
	goal: {
		goalCount: {
			type: Number,
			max: 300,
			min: 0
		},
		tally: {
			type: Number,
			default: 0
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		startCount: {
			type: Number
		},
		category: {
			type: String,
			enum: ['reading', 'studying', 'exercise', 'chores', 'work', 'hobbies', 'other']
		},
		isComplete: {
			type: Boolean
		}
	},
	categories: {
		reading: {
			type: Number
		},
		studying:{
			type: Number
		},
		exercise: {
			type: Number
		},
		chores: {
			type: Number
		},
		work: {
			type: Number
		},
		hobbies: {
			type: Number
		},
		other: {
			type: Number
		}
	}
})

memberSchema.methods.createGoal = function(count, category) {
	const member = this

	const goal = {
		goalCount: count,
		startCount: category ? member.categories[category] : member.tally,
		isComplete: false
	}
	if (category) {
		goal.category = category
	}

	return member.save()
	.then(member => {
		return Promise.resolve(member.goal)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

memberSchema.methods.addtime = function(duration) {
	const member = this

	// add to tally
	member.tallies[activeTrack] += duration

	// add to category tally
	if (member.activeCategory) {
		member.categories[member.activeCategory] += duration
	}

	// add to goal if: goal exists + is active + (no category/same category as goal)
	// if goal met, mark as complete
	if (member.goal && !member.goal.isComplete && (!member.goal.category || member.goal.category === member.activeCategory)) {
		member.goal.tally += duration
		if (member.goal.tally === member.goal.goalCount) member.isComplete = true
	}

	return member.save()
	.then(member => {
		return Promise.resolve({tally: member.tallies[activeTrack], goal: member.goal})
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

memberSchema.methods.removeTime = function(duration, category) {
	const member = this

	member.tally -= duration
	if (member.activeCategory) {
		member.categories[member.activeCategory] -= duration
	}
	
	if (member.goal && !member.goal.isComplete && (!member.goal.category || member.goal.category === member.activeCategory)) {
		member.goal.tally -= duration
	}

	return member.save()
	.then(member => {
		return Promise.resolve(member.tally)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}



const Member = mongoose.model('Member', memberSchema)

module.exports = Member