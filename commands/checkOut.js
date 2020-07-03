module.exports = {
	name: 'check out',
	description: `Tell the bot you're done sprinting!`,
	async execute(message, args, channel) {
		
		const guildsController = require('../data/controllers/guildsController')
		const autoStatus = require('../state/autoStatus')

		// remove from autoStatus sprinters
		channel.includes('auto') && autoStatus.checkOut(message.guild.id, message.channel.name.includes('25') ? '25' : '50', message.member.id)

		// remove from guild in db
		await guildsController.checkOut(message.guild.id, message.member.id)

		// remove role
		const pingRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === `sprint-${message.channel.name.includes('25') ? '30' : '60'}`)
		message.member.roles.remove(pingRole).catch(console.error)
		
		message.channel.send(`You have been checked out!`)
		
	}

}