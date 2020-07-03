module.exports = {
	name: 'sprint',
	description: 'basic sprint command',
	async execute(message, args, channel) {
		if (channel === 'single-sprints' || channel === 'testing') {

			const sprint = require('../support/sprint')
			const calculateDuration = require('../support/duration')
			const activeSolo = require('../state/activeSolo')
			const defaultTime = 25 * 60000

			const duration = calculateDuration(args, defaultTime)

			if (duration.error) {
				message.channel.send(duration.error)
			} else if(activeSolo.isSprinting(message.guild.id, message.member.id)) {
				message.channel.send(`You're already sprinting!`)
			} else {
				// const data = {
				// 	duration,
				// 	guild: message.channel.guild.id,
				// 	channel: message.channel.id
				// }
				const options = {
					ping: message.member.toString(),
					duration
				}
	
				sprint(message, options)
			}

		} else {
			message.channel.send('You cannot use this command in this channel')
		}
	}
}