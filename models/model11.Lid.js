const { Schema, model } = require('mongoose')
const { Stage } = require('./model4.Stage')
const { Group } = require('./model6.Group')
const { LidStatus } = require('./model9.LidStatus')
const { ReasonLid } = require('./model10.ReasonLid')

const lidSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	lidStage_id: { type: Schema.Types.ObjectId, ref: Stage },
	testDate: { type: Date, required: true },
	trialLessonDate: { type: Date, required: true },
	trialLessonTime: { type: String, required: true },
	trialLessonGroup_id: { type: Schema.Types.ObjectId, ref: Group },
	lidStatus_id: { type: Schema.Types.ObjectId, ref: LidStatus },
	cancelReason_id: { type: Schema.Types.ObjectId, ref: ReasonLid },
})
const Lid = model('lid', lidSchema)
module.exports = { Lid }
