const guildsController = require('../data/controllers/guildsController')

module.exports = {
	name: 'track',
	description: 'Switch tracks',
	async execute(message, args) {
		// botsir switch track regency/1
		const argArray = args.trim().split(' ')

		if (!Number.isInteger(Number(argArray[1]))) {
			const tracks = await guildsController.getTracks(message.guild.id)

			let trackNumber = ''

			if (tracks) {
				for(const track in tracks) {
					console.log(track)
					if (tracks[track].name === argArray[1]) {
						trackNumber = track
						console.log('hi')
						break;
					}
				}

				

				if (!trackNumber) {
					const trackArray = Object.entries(tracks).map(track => track && track[1].name).filter(track => track)
					message.channel.send(`No track by that name exists. The tracks available are: ${trackArray}`)
				}
			} else {
				message.channel.send('DB error')
			}
			
		}

		

	}  
}