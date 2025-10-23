const { Schema, model, } = require('mongoose')
const { Stuff } = require('./model2.Stuff')
const { Role } = require('./model1.Role')

const stuffRoleSchema = new Schema({
	stuff_id: { type: Schema.Types.ObjectId, ref: Stuff },
	role_id: { type: Schema.Types.ObjectId, ref: Role}
})


const StuffRole = model('stuffRole', stuffRoleSchema)

module.exports = { StuffRole }
