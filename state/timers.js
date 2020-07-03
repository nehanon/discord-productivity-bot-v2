let timers = []

// module.exports = timers

module.exports.resetTimer = () => {
	timers = []
	return timers
}

module.exports.addTimer = (timeout, member, guild) => {
	const date = Date.now()
	const timer = {
		timeout,
		member,
		guild,
		createdAt: date
	}
	timers.push(timer)
	return timer
}

module.exports.removeTimer = (member, guild) => {
	timers = timers.filter(timer => timer.member !== member && timer.guild !== guild)
	return timers
}

module.exports.getTimers = () => {
	return timers
}

// module.exports.getActiveTimer = (guildId) => {
// 	return timers.find(timer => timer.isGroup && timer.guild === guildId)
// }

module.exports.getTimer = (member, guild) => {
	return timers.find(timer => timer.member === member && timer.guild === guild)
}