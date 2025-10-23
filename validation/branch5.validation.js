const Joi = require("joi")

const branchRegisterVal = Joi.object({
	name: Joi.string().trim(),
	address: Joi.string(),
	callNumber: Joi.string().pattern(/^\+998\d{9}$/),
})

const branchUpdateVal = Joi.object({
	name: Joi.string().trim(),
	address: Joi.string(),
	callNumber: Joi.string().pattern(/^\+998\d{9}$/),
})

module.exports = {
	branchRegisterVal,
	branchUpdateVal
}