module.exports = {
	name: 'subscribe',
	description: 'Be pinged when a new set of sprints starts in this channel',
	execute(message, args, channel) {
		if(channel.includes('auto')) {
			const subscriber = message.guild.roles.cache.find(role => role.name.toLowerCase() === `subscriber-${channel.includes('25') ? '25' : '50'}`)
			message.member._roles.includes(subscriber.id) 
			?
			message.channel.send('You are already subscribed to this channel')
			:
			message.member.roles.add(subscriber).then(() => message.channel.send(`You will now be pinged when a new set of sprints starts in this channel!`)).catch(err => console.log(err))
		} else {
			message.channel.send('You cannot subscribe to this channel')
		}
	}
}