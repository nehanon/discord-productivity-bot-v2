const activeSolo ={}

module.exports.addSprinter = (guild, member) => {
	if (activeSolo[guild]) {
		activeSolo[guild] = [...activeSolo[guild], member]
	} else {
		activeSolo[guild] = [member]
	}
}

module.exports.removeSprinter = (guild, member) => {
	activeSolo[guild] = activeSolo[guild].filter(sprinter => sprinter !== member)
}

module.exports.isSprinting = (guild, member) => {
	if (activeSolo[guild] && activeSolo[guild].find(sprinter => sprinter === member)) {
		return true
	} else {
		return false
	}
}

module.exports.clearSolo = (guild) => {
	activeSolo[guild] = []
}

module.exports.sprinters = activeSolo