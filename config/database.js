const mongoose = require('mongoose')

const {connectionURI} = require('../config.json')

const setupDB = async () => {
	try {
		await mongoose.connect(connectionURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log('connected to db')

		const autoStatus = require('../state/autoStatus')
		const guildsController = require('../data/controllers/guildsController')

		if (!autoStatus.status.length > 0) {
			const guilds = await guildsController.list()
			guilds.length > 0 && guilds.forEach(guild => {
				autoStatus.addGuild(guild.guildId)
				autoStatus.setSprinters(guild.guildId, guild.activeSprinters)
			})
		}
	} catch(err) {
		console.log('DB connection error', err)
	}
}

// const connection = setupDB()

module.exports = setupDB