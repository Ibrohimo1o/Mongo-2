const { Schema, model } = require('mongoose')
const { Group } = require('./model6.Group')

const lessonSchema = new Schema({
	lessonTheme: { type: String, required: true },
	lessonNumber: { type: Number, required: true },
	group_id: { type: Schema.Types.ObjectId, ref: Group },
	lessonDate: { type: Date, required: true },
})

const Lesson = model('lesson', lessonSchema)
module.exports = { Lesson }