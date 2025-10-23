const Joi = require('joi')

const lidStatusRegisterVal= Joi.object({
	status: Joi.string().required().trim(),
});
const lidStatusUpdateVal= Joi.object({
	status: Joi.string().required().trim(),
});

module.exports = {lidStatusRegisterVal,lidStatusUpdateVal}