const { Schema, model } = require('mongoose')
const { Group } = require('./model6.Group')
const { Stuff } = require('./model2.Stuff')

const groupStuffSchema = new Schema({
	group_id: { type: Schema.Types.ObjectId, ref: Group, unique: true },
	stuff_id: { type: Schema.Types.ObjectId, ref: Stuff },
})

const GroupStuff = model('groupStuff', groupStuffSchema)
module.exports = { GroupStuff }