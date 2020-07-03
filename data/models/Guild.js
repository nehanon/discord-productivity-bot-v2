const mongoose = require('mongoose')

const guildSchema = new mongoose.Schema({
	added: {
		type: Date,
		default: Date.now
	},
	guildId: {
		type: String,
		unique: true,
		required: true
	},
	activeSprinters: [{
		checkedInAt: {
			type: Date,
			default: Date.now
		},
		memberId: {
			type: String,
			required: true
		},
		channel: {
			type: String
		},
		duration: {
			type: Number,
			required: true
		}
	}],
	tracks: {
		track1: {
			name: {
				type: String,
				maxLength: 25
			},
			levelRoles: {
				type: [String]
			},
		},
		track2: {
			name: {
				type: String,
				maxLength: 25
			},
			levelRoles: {
				type: [String]
			}
		},
		track3: {
			name: {
				type: String,
				maxLength: 25
			},
			levelRoles: {
				type: [String]
			}
		},
		track4: {
			name: {
				type: String,
				maxLength: 25
			},
			levelRoles: {
				type: [String]
			}
		},
	},
	levelCounts: {
		type: [Number]
	}
})

guildSchema.methods.createTrack = function(number, name) {
	const guild = this
	
	if (number != 1 && number!=2 && number!=3 && number!=4) return Promise.reject({error: 'Cannot create this track'})

	for(const track in guild.tracks) {
		if (track.name === name) return Promise.reject({error: 'Names must be unique'})
	}

	guild.tracks[`track${number}`].name = name

	return guild.save()
	.then(guild => {
		return Promise.resolve(guild.tracks[`track${number}`])
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

guildSchema.methods.addAllLevels = function(levelData) {
	const guild = this

	if (levelData.levelRoles.length > 12) {
		return Promise.reject({error: 'Max of 12 roles exceeded'})
	} 

	console.log(guild)
	
	guild.tracks[levelData.track].levelRoles = levelData.levelRoles

	return guild.save()
	.then(guild => {
		return Promise.resolve(guild.tracks[levelData.track].levelRoles)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

guildSchema.methods.addLevel = function(level, track, role) {
	const guild = this

	if (level > 12) return Promise.reject({error: 'You can creat up to 12 levels for each track'})

	guild.tracks[track].levelRoles[level - 1] = role

	return guild.save()
	.then(guild => {
		return Promise.resolve(guild.tracks[track].levelRoles)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

guildSchema.method.addLevelCounts = function(level, count) {
	if (level > 12) return Promise.reject({error: 'You can creat up to 12 levels for each track'})

	this.levelCounts[level - 1] = count

	return guild.save()
	.then(guild => {
		return Promise.resolve(guild.tracks[track])
	})
	.catch(err => {
		return Promise.reject(err)
	})
}


const Guild = mongoose.model('Guild', guildSchema)

module.exports = Guild