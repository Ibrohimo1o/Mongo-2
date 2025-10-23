const Joi = require("joi")

const studentLessonRegisterVal = Joi.object({
	lesson_id: Joi.string().required(),
	student_id: Joi.string().required(),
	isThere: Joi.boolean().required(),
	reason: Joi.string().required(),
	bePaid: Joi.boolean().required(),
})

const studentLessonUpdateVal = Joi.object({
	lesson_id: Joi.string().required(),
	student_id: Joi.string().required(),
	isThere: Joi.boolean().required(),
	reason: Joi.string().required(),
	bePaid: Joi.boolean().required(),
})

module.exports = {
	studentLessonRegisterVal,
	studentLessonUpdateVal
}