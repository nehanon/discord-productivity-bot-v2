module.exports = {
	name: 'stop',
	description: 'Focus sprints/Pomodoros',
	// guildOnly: true,
	async execute(message, args, channel) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			const autoStatus = require('../state/autoStatus')

			if (channel.includes( 'auto-sprint') && channel.includes('25')) {
				autoStatus.setInactive(message.guild.id, '25')
				message.channel.send('logging to console')
			} else if (channel.includes( 'auto-sprint') && channel.includes('50')) {
				autoStatus.setInactive(message.guild.id, '50')
				message.channel.send('logging to console')
			} else {
				message.channel.send(`You can not use this command in this channel!`)
			}
		} else {
			message.channel.send('You cannot use this command!')
		}
	}
}