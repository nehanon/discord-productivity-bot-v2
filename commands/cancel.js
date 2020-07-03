module.exports = {
	name: 'cancel sprint',
	description: 'Cancel your current ongoing sprint',
	async execute(message, args, channel) {
		if (channel.includes('auto')) {

			const channelInterval = message.channel.name.includes('25') ? '25' : '50'
			const autoStatus = require('../state/autoStatus')
			if (autoStatus.getStatus(message.guild.id, channelInterval)) {
				const activeSprinters = autoStatus.getSprinters(message.guild.id, channelInterval).activeSprinters
				if (activeSprinters.length > 1) {
					message.channel.send('You cannot cancel this sprint since you are not the only person checked in. Please ping an admin so they can cancel the sprint for you.')
				} else {
					autoStatus.setInactive(message.guild.id, channelInterval)
					message.channel.send('Sprint has been cancelled')
				}
			} else {
				message.channel.send(`Auto sprints are not active in this channel`)
			}
// change in prod
		} else if(channel.includes('afk') || channel.includes('single-sprint')) {
			const Discord = require('discord.js')
			const timers = require('../state/timers')
			const activeSolo = require('../state/activeSolo')

			if (activeSolo.isSprinting(message.guild.id, message.member.id)) {
				const timer = timers.getTimer(message.member.id, message.guild.id)
				console.log(timer, 'timer')

				const now = Date.now()
				const timeElapsed = now - timer.createdAt
				
				const time = (Math.floor(timeElapsed/60000)) === 0 ? timeElapsed/1000 + 's' : (Math.floor(timeElapsed/60000)) > 60 ? Math.round((Math.floor(timeElapsed/60000)) * 100/60)/100 + 'h' : (Math.floor(timeElapsed/60000)) + 'm'

				clearTimeout(timer.timeout)
				
				activeSolo.removeSprinter(message.guild.id, message.member.id)
				timers.removeTimer(message.member.id, message.guild.id)
				
				const stopEmbed = new Discord.MessageEmbed()
				.setColor('DARK_PURPLE')
				.setTitle(`You cancelled your afk sprint after ${time}!`)
				.setDescription(`React to this message and follow instructions to bump your tally. You can bump upto ${time}`)

				const stopMessage = await message.channel.send(stopEmbed)
				stopMessage.react('🔺')


			} else {
				message.channel.send(`You are not sprinting right now`)
			}
			
			
		} else {
			message.channel.send('You cannot cancel sprints in this channel')
		}
	}
}