const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token} = require('./config.json')

const client = new Discord.Client()
const setupDB = require('./config/database')
setupDB()

process.on('SIGINT', function(err, code) {
	console.log('process killed', err, code);
	(async () => {
		// const channels = client.channels.cache.filter(channel => channel.name === 'testing')
		// const promiseArray = []
		// for (channel of channels.entries()) {
		// 	promiseArray.push(channel[1].send('Something went wrong and the bot had to restart. All sprints will have to be remade.'))
		// }
		// const results = await Promise.all(promiseArray)
		process.exit(err ? '1' : '0')
	})();
})

process.on('uncaughtException', function (err) {
	console.error('An uncaught error occurred!');
	console.error(err.stack);
})

client.commands = new Discord.Collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}
const emojiFinder = require('./support/emojiFinder')

client.on('guildCreate', guild => {
	const autoStatus = require('./state/autoStatus')
	const guildsController = require('./data/controllers/guildsController')

	const data = {
		guildId: guild.id
	}
	autoStatus.addGuild(guild.id)
	
	guildsController.create(data).catch(console.error)
})

client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`)

	// initialise autostate for all connected guilds:
	const autoStatus = require('./state/autoStatus')
	const guildsController = require('./data/controllers/guildsController')

	for (guild of client.guilds.cache) {
		try {
			const guildCheckins = await guildsController.showCheckIns(guild[0])
			if (guildCheckins && guildCheckins.length > 0) {
				autoStatus.setSprinters(guild[0], guildCheckins)
			} else if (!guildCheckins) {
				autoStatus.addGuild(guild[0])
			}
		} catch (err) {
			console.log(err)
		}
	}
})

client.on('message', message => {

	if (message.author.bot) return

	const messageContent = message.content.toLowerCase()

	if (messageContent.includes('ignore')){
        return
	} 

	if(messageContent.includes(prefix)) {
		const args = messageContent.replace(prefix, '')
		const command = client.commands.find(command => args.includes(command.name))
		
		if (!command) {
			const reactions = client.commands.get('reactions')
			
			const trigger = reactions.triggers.find(trigger => args.includes(trigger))
				
			if (trigger) reactions.execute(message, trigger) 
			else {
				const randomResponse = [`✨`, '⭐', '👀', '🦋', '🌸', '🌼']
				message.channel.send(randomResponse[Math.floor(Math.random() * randomResponse.length)])
			}
		} else {
			try {
				const channel = message.channel.name
				command.execute(message, args, channel)
			} catch (error) {
				console.error(error, 'error')
				message.reply('Whoops I broke 😭')
			}
		}

	} else if (message.content.toLowerCase().includes('comfy')) {
		message.react(emojiFinder(message, 'comfy'))
	} else if(message.content.toLowerCase().includes('yay')) {
		message.react(emojiFinder(message, 'blobcheer'))
	}
})

client.on('messageReactionAdd', (reaction, user) => {
	if (!reaction.message.author.bot || user.bot) return
})
client.login(token)