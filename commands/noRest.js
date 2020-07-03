module.exports = {
	name: 'no rest pings',
	description: 'No rest pings',
	async execute(message, args, channel) {
		if (!channel.includes('auto')) {
			message.channel.send('You cannot use this command in this channel')
		} else {
			const autoStatus = require('../state/autoStatus')
			autoStatus.setNoRest(message.guild.id, channel.includes('25') ? '25' : '50', message.member.id)
			message.channel.send(`Alright! You won't be pinged for rests.`)
		}
	}
}