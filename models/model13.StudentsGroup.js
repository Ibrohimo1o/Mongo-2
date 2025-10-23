const { Schema, model } = require('mongoose')
const { Student } = require('./model12.Student')
const { Group } = require('./model6.Group')

const studentsGroupSchema = new Schema({
	student_id: { type: Schema.Types.ObjectId, ref: Student },
	group_id: { type: Schema.Types.ObjectId, ref: Group }
})

const StudentsGroup = model('studentsGroup', studentsGroupSchema)
module.exports = { StudentsGroup }