const sprint = async(message, options) => {

	const activeSolo = require('../state/activeSolo')
	const timers = require('../state/timers')
	
	const {duration, ping, endingMessage, startingMessage} = options
	
	activeSolo.addSprinter(message.guild.id, message.member.id)
	message.channel.send(startingMessage)

	const timeout = setTimeout(async function() {
		activeSolo.removeSprinter(message.guild.id, message.member.id)
		const endMessage = await message.channel.send(ping, endingMessage)
		endMessage.react('🔺')
		timers.removeTimer(message.member.id, message.guild.id)

	}, duration)

	timers.addTimer(timeout, message.member.id, message.guild.id)
	console.log(timers.getTimers())
}

module.exports = sprint