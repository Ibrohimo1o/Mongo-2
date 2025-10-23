const { Schema, model } = require('mongoose')
const { Student } = require('./model12.Student')
const { Lesson } = require('./model8.Lesson')

const studentLessonSchema = new Schema({
	lesson_id: { type: Schema.Types.ObjectId, ref: Lesson },
	student_id: { type: Schema.Types.ObjectId, ref: Student },
	isThere: { type: Boolean, required: true },
	reason: { type: String, required: true },
	bePaid: { type: Boolean, required: true }
})

const StudentLesson = model('studentLesson', studentLessonSchema)
module.exports = { StudentLesson }