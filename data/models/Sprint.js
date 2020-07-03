const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
		expires: '1440m'
	},
	duration: {
		type: Number
	},
	guild: {
		type: String
	},
	channel: {
		type: String
	}
})


const Sprint = mongoose.model('Sprint', sprintSchema)

module.exports = Sprint