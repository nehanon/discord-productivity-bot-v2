const Guild = require('../models/Guild')

module.exports.list = async(id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guilds = await Guild.find()
			return guilds
		} catch(err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}

module.exports.getTracks = async(id) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			if (guild) {
				const tracks = {
					track1: guild.tracks.track1,
					track2: guild.tracks.track2,
					track3: guild.tracks.track3,
					track4: guild.tracks.track4,
				}
				console.log(tracks)
				return tracks
			} else {
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	}
}

module.exports.addAllLevels = async(id, levelData) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			if (guild) {
				const trackRoles = await guild.addAllLevels(levelData)
				return trackRoles
			} else {
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	}
}

module.exports.addLevel = async(id, levelData) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			if (guild) {
				const trackRoles = await guild.addLevel(levelData.level, levelData.track, levelData.role)
				return trackRoles
			} else {
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	}
}

module.exports.create = async(data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = new Guild(data)

			const newGuild = guild.save()
			return newGuild
		} catch (err) {
			return {error: err}
		}
	}
}

module.exports.createTrack = async(id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			if (guild) {
				const track = await guild.createTrack(data.number, data.name)
				return track
			} else {
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	}
}

module.exports.setLevelCounts = async(id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOneAndUpdate({guildId: id}, data)
			if (guild) {
				console.log(guild)
				return guild.levelCounts
			} else {
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	}
}

module.exports.checkIn = async(id, data) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			if (guild) {
				const activeSprinters = guild.activeSprinters.filter(sprinter => {
					return (sprinter.duration + sprinter.checkedInAt.getTime()) > Date.now()
				})
	
				const find = activeSprinters.find(sprinter => {
					return sprinter.memberId === data.memberId
				})
				
				if (find) {
					find.duration = data.duration
					find.username = data.username
					find.checkedInAt = Date.now()
					find.channel = data.channel
					guild.activeSprinters = activeSprinters
				} else {
					const newSprinters = [...activeSprinters, data]
					guild.activeSprinters = newSprinters
				}
	
	
				const newGuild = await guild.save()
				return newGuild.activeSprinters
			} else {
				return null
			}
		} catch(err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}

module.exports.checkOut = async(id, memberId) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try{
			const guild = await Guild.findOne({guildId: id})
			const activeSprinters = guild.activeSprinters.filter(sprinter => {
				return ((sprinter.duration + sprinter.checkedInAt.getTime()) > Date.now()) && sprinter.memberId !== memberId
			})

			guild.activeSprinters = activeSprinters

			const newGuild = await guild.save()
			return newGuild.activeSprinters

		} catch (err) {
			console.log(err)
			return null
		}
	}
}

module.exports.showCheckIns = async(id) => {
	const mongoose = require('mongoose')
	if (mongoose.connection.readyState) {
		try {
			const guild = await Guild.findOne({guildId: id})
			if (guild) {
				const activeSprinters = guild.activeSprinters.filter(sprinter => {
					return (sprinter.duration + sprinter.checkedInAt.getTime()) > Date.now()
				})
				return activeSprinters
			} else {
				return null
			}			
		} catch(err) {
			console.log(err)
			return null
		}
	} else {
		return null
	}
}