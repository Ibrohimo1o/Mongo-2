const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
	name: { type: String, required: true, trim: true, unique: true }
})

const Role = model('role', roleSchema)
module.exports = { Role }