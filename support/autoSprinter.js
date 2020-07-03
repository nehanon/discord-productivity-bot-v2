const Discord = require('discord.js')
const emojiFinder = require('../support/emojiFinder')

const autoSprinter = async(message, sprintDuration, restDuration, pingRole) => {
	
	const autoStatus = require('../state/autoStatus')
	const channel = message.channel.name.includes('25') ? '25' : '50'

	const sprintSet = async() => {
		const sprinters = autoStatus.getSprinters(message.guild.id, channel)

		const activeSprinters = sprinters.activeSprinters
		const inactiveSprinters = sprinters.inactiveSprinters

		// automatically remove members who are no longer checked in from the ping role
		inactiveSprinters.forEach(sprinter => {
			const member = message.guild.members.cache.get(sprinter.member)
			member.roles.remove(pingRole).catch(console.error)
		})
	
		if (activeSprinters.length>0) {
			// send sprint start message
			const sprintStart = new Discord.MessageEmbed()
				.setColor('GOLD')
				.setTitle('🔥 Sprint!')
				.setDescription(`A new sprint has started! This sprint will end in ${Math.floor(sprintDuration/60000)} minutes`)
				.setTimestamp()

			await message.channel.send(sprintStart)
			await new Promise(resolve => setTimeout(resolve, sprintDuration))

			// cancel the sprint if a manual cancel command was executed
			if (!autoStatus.getStatus(message.guild.id, channel)) return

			// get members who haven't asked not to be pinged for rests
			const noRestPings = autoStatus.getRest(message.guild.id, channel).join(' ')
			const restPings = activeSprinters.filter(sprinter => !noRestPings.includes(sprinter.member)).map(sprinter => `<@${sprinter.member}>`).join(' ')

			// send rest message
			const restStart = new Discord.MessageEmbed()
				.setColor('BLUE')
				.setTitle(`${['🍵', '🎶', '🧘', '⛱️', '🍎', '💤'][Math.floor(Math.random() * 6)]} Rest~ `)
				.setDescription(`Time's up! Your rest of ${Math.floor(restDuration/60000)} minutes starts now.\n`)
				.setTimestamp()
			
			await message.channel.send(restPings, restStart)
			await new Promise(resolve => setTimeout(resolve, restDuration))


			// send interval ending message, ping all members checked in via role
			const intervalEnd = new Discord.MessageEmbed()
				.setColor('GREEN')
				.setTitle(`⏱️ End of interval!`)
				.setDescription(`That was ${Math.floor((sprintDuration + restDuration)/60000)} minutes. Good job, everyone!`)
				.setTimestamp()

			await message.channel.send(pingRole, intervalEnd)
			// return Promise.resolve(true)
		} else {
			autoStatus.setInactive(message.guild.id, channel)
			const endAuto = new Discord.MessageEmbed()
				.setColor('RED')
				.setTitle(`That's it, folks!`)
				.setThumbnail('https://cdn.discordapp.com/emojis/727833104575889509.gif')
				.setDescription('No more sprints will be started as no one is checked in. Use the command `check in <duration>` to start sprints again.')
			
			message.channel.send(endAuto)
			// return Promise.resolve(false)
		}
	}

	// const isActive = await sprintSet()
	
	while(autoStatus.getStatus(message.guild.id, channel)) {
		await sprintSet()
	}
}

module.exports = autoSprinter