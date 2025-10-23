const { Schema, model } = require('mongoose')
const { Branch } = require('./model5.Branch')
const { Stage } = require('./model4.Stage')


const groupSchema = new Schema({
	groupName: { type: String, required: true, unique: true },
	lessonStartTime: { type: String, required: true },
	lessonContinues: { type: String, required: true },
	lessonWeekDay: { type: String, required: true },
	groupStage_id: { type: Schema.Types.ObjectId, ref: Stage },
	roomNumber: { type: String, required: true },
	roomFloor: { type: Number, required: true },
	branch_id: { type: Schema.Types.ObjectId, ref: Branch },
	lessonsQuant: { type: Number, required: true },
	isActive: { type: Boolean, required: true }
})

const Group = model('group', groupSchema)
module.exports = { Group }