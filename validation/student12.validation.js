const Joi = require("joi")

const studentRegisterVal = Joi.object({
	lid_id: Joi.string().required(),
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
	birthday: Joi.date().required(),
	gender: Joi.string().trim().required(),
})

const studentUpdateVal = Joi.object({
	lid_id: Joi.string().required(),
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
	birthday: Joi.date().required(),
	gender: Joi.string().trim().required(),
})

module.exports = {
	studentRegisterVal,
	studentUpdateVal
}