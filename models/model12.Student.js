const {Schema, model} = require('mongoose')
const { Lid } = require('./model11.Lid')

const studentsSchema = new Schema({
	lid_id: {type: Schema.Types.ObjectId, ref: Lid},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	phoneNumber: {type: String, required: true},
	birthday: {type: Date, required: true},
	gender: {type: String, required: true}
})

const Student = model('student', studentsSchema)
module.exports = { Student}