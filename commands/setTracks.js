const guildsController = require('../data/controllers/guildsController')

module.exports = {
	name: 'set track',
	description: 'set tracks',
	async execute(message, args) {

		if (message.member.hasPermission('ADMINISTRATOR')) {
			const argArray = args.trim().split(' ')
			if (args.includes('levels')) {
				if (argArray.length > 16 || argArray.length === 4) {
					message.channel.send('syntax whoops')
					const roleNameArray = argArray.slice(4)
					console.log(roleNameArray)
				} else {
					const roleNameArray = argArray.slice(4)
					let roleArray = []
					for (let i = 0; i < roleNameArray.length; i++) {
						const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleNameArray[i])
						if (role)roleArray.push(role.id)
						else break
					}
					if (roleArray.length !== roleNameArray.length) {
						message.channel.send('whoops one of those roles does not exist')
					} else {
						const levelData = {
							levelRoles: roleArray,
							track: `track${argArray[2]}`
						}

						const levelRoles = await guildsController.addAllLevels(message.guild.id, levelData)

						if (levelRoles) message.channel.send('ok')
						else message.channel.send('DB error')
					}
				}
			} else if (args.includes('level')) {
				// botsir set track 1 level 1 role
				// botsir set track 1 levels page squire knight baronet baron viscount earl marquess duke prince king

				if (argArray.length !== 6 || !Number.isInteger(Number(argArray[2])) || !Number.isInteger(Number(argArray[4])) || argArray[2] > 12 || argArray[4] > 12 || argArray[2] < 1 || argArray[4] < 1) {
					message.channel.send(`That's the not the right syntax for this command. Use ${'`set track <number> level <number> <role name>`'}.Use a track from 1 - 4, and a level from 1 - 12`)	
				} else {
					const roleName = argArray[5]
					const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName)

					if (!role) {
						message.channel.send('No role by this name was found.')
					} else {
						const levelData = {
							level: argArray[4],
							track: `track${argArray[2]}`,
							role: role.id
						}

						const trackRoles =  await guildsController.addLevel(message.guild.id, levelData)

						if (trackRoles) {
							console.log(trackRoles)
							message.channel.send('Done!')
						} else {
							message.channel.send('DB error')
						}
						
					}

				}
				
			} else {
				if (argArray.length > 4 || !argArray[2] || !argArray[3] || argArray[3].length > 25 || !['1', '2', '3', '4'].includes(argArray[2])) {
					message.channel.send(`That's the not the right syntax for this command. Use ${'`set track <number> <name>`'}. The name should be a single word and cannot be longer than 25 characters. Number should be between 1 to 4.`)
				} else {
					
	
					const data = {
						number: argArray[2],
						name: argArray[3]
					}
					
					const track = await guildsController.createTrack(message.guild.id, data)
	
					message.channel.send('Updated!')
	
					console.log(track)
				}
			}
			
			

			// const tracks = await guildsController.createTrack(id, data)
		} else {
			message.channel.send('You cannot use this command')
		}
		

		
	}
}