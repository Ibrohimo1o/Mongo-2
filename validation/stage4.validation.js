const Joi = require("joi")

const stageRegisterVal = Joi.object({
	name: Joi.string().required().trim()
})

const stageUpdateVal = Joi.object({
	name: Joi.string().required().trim()
})

module.exports = {
	stageRegisterVal,
	stageUpdateVal
}