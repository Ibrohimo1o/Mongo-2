const { Schema, model } = require('mongoose')

const lidStatusSchema = new Schema({
	status: { type: String, required: true }
})

const LidStatus = model('lidStatus', lidStatusSchema)
module.exports = { LidStatus }