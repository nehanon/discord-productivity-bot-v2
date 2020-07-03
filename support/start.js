const start = (autoStatus, channel, message, pingRole) => {
	const autoSprinter = require('../support/autoSprinter')
	let sprintDuration = 0
	let restDuration = 0
	if (channel.includes('25')) {
		sprintDuration = 25 * 60000/60
		restDuration = 5 * 60000/60
		
		autoStatus.setActive(message.guild.id, '25')
	} else if (channel.includes('50')) {
		sprintDuration = 50 * 60000/60
		restDuration = 10 * 60000/60

		autoStatus.setActive(message.guild.id, '50')
	}
	autoSprinter(message, sprintDuration, restDuration, pingRole)
}

module.exports = start