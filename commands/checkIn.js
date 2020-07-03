module.exports = {
	name: 'check in',
	description: 'Tell the bot how long you will be sprinting',
	async execute(message, args, channel) {

		const Discord = require('discord.js')
		const calculateDuration = require('../support/duration')
		const guildsController = require('../data/controllers/guildsController')
		const start = require('../support/start')
		const duration = calculateDuration(args)

		if (duration.error) {
			message.channel.send(duration.error)
		} else if (duration > 21600000) {
			message.channel.send('You can only check in for upto 6 hours at a time!')
		} else if(!channel.includes('auto-sprint') && channel !== 'afk-sprinting') {
			message.channel.send(`You can't check in to this channel. Try an auto-sprint channel or afk-sprinting`)
		} else {
			// write to guild document
			const data = {
				memberId: message.member.id,
				username: message.member.user.username,
				duration,
				channel: message.channel.name
			}

			const guild = await guildsController.checkIn(message.guild.id, data)
			const minuteTime = Math.floor(duration/60000)	

			// start auto sprints if auto
			if(channel.includes('auto-sprint')) {

				// Respond to check in:
				const checkInMessage = new Discord.MessageEmbed()
				.setTitle(`📋 You have been checked in for ${minuteTime === 0 ? duration/1000 + 's' : minuteTime > 60 ? Math.round(minuteTime * 100/60)/100 + 'h' : minuteTime + 'm'}!`)
				.setThumbnail('https://cdn.discordapp.com/emojis/410656255779143691.gif')
				.setDescription(`Sprints in this channel will continue as long as at least one person is checked in. Use the command ${'`check out`'} to stop sprinting. \n\n🎯 Don't forget to tell us what you'll be working on!`)
				await message.channel.send(checkInMessage)

				
				// check member in to the auto-sprint channel
				const autoStatus = require('../state/autoStatus')

				console.log(autoStatus)
				
				const data = {
					member: message.member.id, duration, checkedInAt: Date.now()
				}
				autoStatus.checkIn(message.guild.id, message.channel.name.includes('25') ? '25' : '50', data)

				// add member to ping role
				const pingRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === `sprint-${message.channel.name.includes('25') ? '30' : '60'}`)

				if (pingRole && !message.member._roles.includes(pingRole.id)) {
					message.member.roles.add(pingRole).catch(console.error)
				}


				// start auto sprints if not already ongoing, ping subscribers if starting
				if (!autoStatus.getStatus(message.guild.id, message.channel.name.includes('25') ? '25' : '50')) {
					const subscriber = message.guild.roles.cache.find(role => role.name.toLowerCase() === `subscriber-${message.channel.name.includes('25') ? '25' : '50'}`)
					subscriber && message.channel.send(`${subscriber}`)
					start(autoStatus, channel, message, pingRole)
				}
				

			} else if (channel === 'afk-sprinting') {

				const sprint = require('../support/sprint')

				// respond to check in:
				const checkInMessage = new Discord.MessageEmbed()
				.setTitle(`📋 You have been checked in for ${minuteTime === 0 ? duration/1000 + 's' : minuteTime > 60 ? Math.round(minuteTime * 100/60)/100 + 'h' : minuteTime + 'm'}!`)
				.setDescription(`🎯 Don't forget to tell us what you'll be working on!`)
				!guild && message.channel.send('Warning: The database is currently down. If the bot resets during your sprint, it will not be restored.')
					
				// start afk sprint
				console.log(message.member)
				const startingMessage = new Discord.MessageEmbed()
				.setColor('DARK_PURPLE')
				.setTitle(`Good luck, ${message.member.user.username}!`)
				
				const endingMessage = new Discord.MessageEmbed()
				.setColor('DARK_PURPLE')
				.setTitle(`Your afk sprint of ${minuteTime === 0 ? duration/1000 + 's' : minuteTime > 60 ? Math.round(minuteTime * 100/60)/100 + 'h' : minuteTime + 'm'} has ended!`)
				.setDescription('React to this message and follow instructions to bump')
				const options = {
					ping: message.member.toString(),
					duration,
					endingMessage,
					startingMessage
				}
				sprint(message, options)

			}
		}
	}
}