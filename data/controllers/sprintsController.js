const Sprint = require('../models/Sprint')

module.exports.show = async(id) => {
	try {
		const sprint = await Sprint.findById(id)
		return sprint
	} catch (err) {
		console.log(err)
		return null
	}
}

module.exports.listByGuild = async(guild) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const sprints = await Sprint.find(guild)
			console.log(sprints, 'in here')
			return sprints
		} catch(err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}

module.exports.create = async (data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		const sprint = new Sprint(data)
		try {
			const newSprint = await sprint.save()
			if (newSprint) return newSprint
		} catch (err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}	
}

module.exports.update = async (id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const updatedSprint = await Sprint.findByIdAndUpdate(id, data, {new:true, runValidators: true, useFindAndModify: false})
			return updatedSprint
		} catch (err) {
			return null
		}
	} else {
		return null
	}	
}

module.exports.destroyMany = async (arg) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const deletedSprints = await Sprint.deleteMany(arg)
			return deletedSprints
		} catch (err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}

module.exports.destroy = async (id) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const deletedSprint = await Sprint.findByIdAndDelete(id)
			return deletedSprint
		} catch (err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}