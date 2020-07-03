// const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const trackSchema = new Schema({
// 	guild: {
// 		type: String
// 	}
// })


// botsir track 1 <name>
// botsir track 1 <role1> <role2> <role3> <role4> etc
// botsir levels 1000 2000 etc
// botsir track <track number> level <level number> <role>

// on member tally : 
// check goal category and add to goal - member/goal
// check active track and add to tally[track] - member/tally
// check level - guild (each time: alt load this when you fetch guild on load, modify it when its modified)
// IF tally[track] before update < level, after update > level - guild.tracks[track].levelRoles[level - 1] to be assigned