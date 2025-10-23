const Joi = require("joi")

const stuffRoleRegisterVal = Joi.object({
	stuff_id: Joi.string().required(),
	role_id: Joi.string().required(),
})

const stuffRoleUpdateVal = Joi.object({
	stuff_id: Joi.string().required(),
	role_id: Joi.string().required(),
})

module.exports = {
	stuffRoleRegisterVal,
	stuffRoleUpdateVal
}