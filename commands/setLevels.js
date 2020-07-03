module.exports = {
	name: 'set level counts',
	description: 'set levels',
	async execute(message, args) {
		
		if (message.member.hasPermission('ADMINISTRATOR')) {
			const argArray = args.trim().split(' ')
			if (argArray.length > 15 || argArray.length <= 3) {
				message.channel.send(`That's the not the right syntax for this command. Use ${'`set level counts <level1 count> <level2 count>... <level12 count>`'}. All counts should be number of hours at which level up will occur.`)
			} else {
				
				for (let i = 3; i < argArray.length; i++) {
					if (isNaN(argArray[i]) || argArray[i]>300000) {
						message.channel.send(`That's the not the right syntax for this command. Use ${'`set level counts <level1 count> <level2 count>... <level12 count>`'}. All counts should be number of hours at which level up will occur.`)
						return
					}
				}

				const guildsController = require('../data/controllers/guildsController')

				const data = {levelCounts: argArray.splice(3, 15)}
				
				const levels = await guildsController.setLevelCounts(message.guild.id, data)
				if (levels) {
					message.channel.send('Done')
				} else {
					message.channel.send('DB error, whoops!')
				}
			}

			// const tracks = await guildsController.createTrack(id, data)
		} else {
			message.channel.send('You cannot use this command')
		}
		

		
	}
}