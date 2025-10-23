const Joi = require("joi")

const groupStuffRegisterVal = Joi.object({
	group_id: Joi.string().trim().required(),
	stuff_id: Joi.string().trim().required(),
})

const groupStuffUpdateVal = Joi.object({
	group_id: Joi.string().trim().required(),
	stuff_id: Joi.string().trim().required(),
})

module.exports = {
	groupStuffRegisterVal,
	groupStuffUpdateVal
}