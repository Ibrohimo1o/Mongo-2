const { Schema, model } = require('mongoose')

const stuffSchema = new Schema({
	firstName: { type: String, required: true, unique: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	login: { type: String, required: true },
	parol: { type: String, required: true },
	isActive: { type: Boolean, required: true }
})

const Stuff = model('stuff', stuffSchema)
module.exports = { Stuff }