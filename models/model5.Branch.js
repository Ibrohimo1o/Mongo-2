const { Schema, model } = require('mongoose')

const branchSchema = new Schema({
	name: { type: String, required: true, trim: true },
	address: { type: String, required: true, trim: true, unique: true },
	callNumber: { type: String, required: true, trim: true },
})

const Branch = model('branch', branchSchema)
module.exports = { Branch }