module.exports = {
	name: 'rest pings',
	description: 'Get pinged after rests',
	async execute(message, args, channel) {
		if (!channel.includes('auto')) {
			message.channel.send('You cannot use this command in this channel')
		} else {
			const autoStatus = require('../state/autoStatus')
			autoStatus.unsetNoRest(message.guild.id, channel.includes('25') ? '25' : '50', message.member.id)
			message.channel.send('Okay! You will be pinged for rests')
		}
	}
}