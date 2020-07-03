const Member = require('../models/Member')

module.exports.setActiveTrack = async(id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const updateData = {
				activeTrack: data.activeTrack
			}
			const guild = await Guild.findOneAndUpdate({guildId: id}, updateData, {new: true, runValidators: true})
			if (guild && guild.activeTrack) {
				return guild.activeTrack
			} else {
				console.log(guild)
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	}
}