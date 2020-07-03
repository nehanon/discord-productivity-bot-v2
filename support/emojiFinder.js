function emojiFinder(message, string) {
	if (message) {
		const emoji = message.client.emojis.cache.find(emoji => emoji.name === string)
		if (emoji) return emoji
		else return ' '
	} else {
		return ' '
	}
}

module.exports = emojiFinder