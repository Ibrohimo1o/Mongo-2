const Joi = require('joi')

const roleRegisterVal= Joi.object({
	name: Joi.string().required().trim().min(3).max(30),
});
const roleUpdatepdaVal= Joi.object({
	name: Joi.string().required().trim().min(3).max(30),
});

module.exports = {roleRegisterVal,roleUpdatepdaVal}