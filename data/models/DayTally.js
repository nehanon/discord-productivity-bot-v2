const mongoose = require('mongoose')

const dayTallySchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now()
	},
	guild: {
		type: String
	},
	tally: [{
		member: String,
		count: Number
	}]	
})

const DayTally = mongoose.model('DayTally', dayTallySchema)

module.exports = DayTally