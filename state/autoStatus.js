const autoStatus = []

module.exports.getStatus = (guild, channel) => {
	return autoStatus[guild][channel].status
}

module.exports.addGuild = (guild) => {
	if (autoStatus.length < 1) {
		autoStatus[guild] = {
			'25': {
				status: false,
				sprinters: [],
				noRest: []
			},
			'50': {
				status: false,
				sprinters: [],
				noRest: []
			},
		}
	} else {
		const find = autoStatus.find(ele => ele[guild])
		if (!find) {
			autoStatus[guild] = {
				'25': {
					status: false,
					sprinters: [],
					noRest: []
				},
				'50': {
					status: false,
					sprinters: [],
					noRest: []
				},
			}
		}
	}
	
}

module.exports.setInactive = (guild, channel) => {
	autoStatus[guild][channel].status = false
	return autoStatus[guild][channel].status
}

module.exports.setActive = (guild, channel) => {
	autoStatus[guild][channel].status = true
	return autoStatus[guild][channel].status
}

module.exports.checkIn = (guild, channel, data) => {
	console.log(data, 'data')
	const sprinters = autoStatus[guild][channel].sprinters
	const find = sprinters.find(sprinter => sprinter.member === data.member)
	if (!find) {
		autoStatus[guild][channel].sprinters = [...sprinters, data]
	} else {
		autoStatus[guild][channel].sprinters = [...sprinters.filter(sprinter => sprinter.member !== data.member), data]
	}
	return autoStatus[guild][channel].sprinters
}

module.exports.checkOut = (guild, channel, member) => {
	const newSprinters = autoStatus[guild][channel].sprinters.filter(sprinter => sprinter.member !== member)
	autoStatus[guild][channel].sprinters = newSprinters
	return autoStatus[guild][channel].sprinters
}

module.exports.getSprinters = (guild, channel) => {
	const now = Date.now()

	const inactiveSprinters = autoStatus[guild][channel].sprinters.filter(sprinter => sprinter.checkedInAt + sprinter.duration <= now)

	const activeSprinters = autoStatus[guild][channel].sprinters.filter(sprinter => sprinter.checkedInAt + sprinter.duration > now)
	autoStatus[guild][channel].sprinters = activeSprinters
	
	return {activeSprinters, inactiveSprinters}
}

module.exports.setSprinters = (guild, activeSprinters) => {
	autoStatus[guild]['25'].sprinters = activeSprinters.filter(sprinter => sprinter.channel && sprinter.channel.includes('25')).map(sprinter => sprinter.memberId)
	autoStatus[guild]['50'].sprinters = activeSprinters.filter(sprinter => sprinter.channel && sprinter.channel.includes('50')).map(sprinter => sprinter.memberId)
	return autoStatus[guild]
	
}

module.exports.setNoRest = (guild, channel, member) => {
	const find = autoStatus[guild][channel].noRest.find(ele => ele === member)
	if (!find) {
		console.log('hi')
		autoStatus[guild][channel].noRest = [...autoStatus[guild][channel].noRest, member]
	}
}

module.exports.unsetNoRest = (guild, channel, member) => {
	autoStatus[guild][channel].noRest = autoStatus[guild][channel].noRest.filter(ele => ele !== member)
	console.log(autoStatus)
}

module.exports.getRest = (guild, channel) => {
	return autoStatus[guild][channel].noRest
}

module.exports.status = autoStatus