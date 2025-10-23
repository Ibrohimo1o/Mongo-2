const Joi = require("joi")

const lidRegisterVal = Joi.object({
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
	lidStage_id: Joi.string().required(),
	testDate: Joi.date().required(),
	trialLessonDate: Joi.date().required(),
	trialLessonTime: Joi.string().required(),
	trialLessonGroup_id: Joi.string().required(),
	lidStatus_id: Joi.string().required(),
	cancelReason_id: Joi.string().required(),
})

const lidUpdateVal = Joi.object({
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/),
	lidStage_id: Joi.string().required(),
	testDate: Joi.date().required(),
	trialLessonDate: Joi.date().required(),
	trialLessonTime: Joi.string().required(),
	trialLessonGroup_id: Joi.string().required(),
	lidStatus_id: Joi.string().required(),
	cancelReason_id: Joi.string().required(),
})

module.exports = {
	lidRegisterVal,
	lidUpdateVal
}