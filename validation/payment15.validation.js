const Joi = require("joi")

const paymentRegisterVal = Joi.object({
	student_id: Joi.string().required(),
	payment_date: Joi.date().required(),
	payment_last_date: Joi.date().required(),
	price: Joi.number().required(),
	isPaid: Joi.boolean().required(),
	totalAttent: Joi.number().required(),
})

const paymentUpdateVal = Joi.object({
	student_id: Joi.string().required(),
	payment_date: Joi.date().required(),
	payment_last_date: Joi.date().required(),
	price: Joi.number().required(),
	isPaid: Joi.boolean().required(),
	totalAttent: Joi.number().required(),
})

module.exports = {
	paymentRegisterVal,
	paymentUpdateVal
}