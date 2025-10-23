const Joi = require('joi')

const reasonLidRegisterVal= Joi.object({
	reasonLid: Joi.string().required().trim(),
});
const reasonLidUpdateVal= Joi.object({
	reasonLid: Joi.string().required().trim(),
});

module.exports = {reasonLidRegisterVal,reasonLidUpdateVal}