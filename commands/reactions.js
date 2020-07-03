const emojiFinder = require('../support/emojiFinder')

module.exports = {
	name: 'reactions',
	triggers: ['hello', 'monster','good job', 'good boy', 'good bot', `you're the best`, 'best bot', 'we love you', 'thank you', 'love me',`you're scary`],
	description: 'reactions!',
	execute(message, trigger) {
		const responseArray = [
			'Thank you 🌸', `Thank you ${emojiFinder(message, 'blob_blush')}`, `Thank you ${emojiFinder(message, 'bloblove')}`, emojiFinder(message, 'blob_blush'), emojiFinder(message, 'bloblove')
		]
		const reactions = {
			'hello': 'Hello hello!',
			'monster': `I'm not a monster ${emojiFinder(message, 'blobcri')}`,
			'good job':  responseArray[Math.floor(Math.random() * responseArray.length)],
			'good boy': responseArray[Math.floor(Math.random() * responseArray.length)], 
			'good bot': responseArray[Math.floor(Math.random() * responseArray.length)],
			"you're the best": responseArray[Math.floor(Math.random() * responseArray.length)],
			'best bot': responseArray[Math.floor(Math.random() * responseArray.length)],
			'we love you': responseArray[Math.floor(Math.random() * responseArray.length)], 
			'i love you': responseArray[Math.floor(Math.random() * responseArray.length)],
			'thank you': [`You're welcome!`, `It's so nice to be appreciated! ${emojiFinder(message, 'blob_blush')}`, `Happy to help!`][Math.floor(Math.random()*4)],
			'love me': [emojiFinder(message, 'bloblove'), emojiFinder(message, 'mmhearts'), emojiFinder(message, 'blob_blush')][Math.floor(Math.random()*3)],
			"you're scary": `I am? ${emojiFinder(message, 'blobcri')}`
		}
		let response = reactions[trigger]
		if (response && response.name) {
			response = `<:${response.name}:${response.id}>`
		}
		response && message.channel.send(response)
	}
}