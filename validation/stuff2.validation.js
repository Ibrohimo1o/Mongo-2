const Joi = require("joi")

const stuffRegisterVal = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
	login: Joi.string().required().trim().min(3).max(30),
	parol: Joi.string()
		.required()
		.min(8)
		.max(30)
		.pattern(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
		),
	isActive: Joi.boolean().required()
})

const stuffUpdateVal = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
	login: Joi.string().required().trim().min(3).max(30),
	parol: Joi.string()
		.required()
		.min(8)
		.max(30)
		.pattern(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
		),
	isActive: Joi.boolean().required()
})

module.exports = {
	stuffRegisterVal,
	stuffUpdateVal
}