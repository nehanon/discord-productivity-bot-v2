const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'kdsfj',
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed()
		.setColor('GOLD')
		.setTitle('Sprint! 🔥')
		// .setURL('https://discord.js.org/')
		// .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('A new sprint has started! This sprint will end in x minutes')
		// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
		// .addFields(
			// { name: 'Details', value: 'Sprint will run for x minutes.' },
		// 	{ name: '\u200B', value: '\u200B' },
		// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
		// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
		// )
		// .addField('Inline field title', 'Some value here', true)
		// .setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		// .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		message.channel.send(exampleEmbed);
	}
}