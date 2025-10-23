const Joi = require("joi")

const lessonRegisterVal = Joi.object({
	lessonTheme: Joi.string().trim().required(),
	lessonNumber: Joi.number().required(),
	group_id: Joi.string().required(),
	lessonDate: Joi.date().required(),
})

const lessonUpdateVal = Joi.object({
	lessonTheme: Joi.string().trim().required(),
	lessonNumber: Joi.number().required(),
	group_id: Joi.string().required(),
	lessonDate: Joi.date().required(),
})

module.exports = {
	lessonRegisterVal,
	lessonUpdateVal
}