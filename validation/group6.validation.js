const Joi = require("joi")

const groupRegisterVal = Joi.object({
	groupName: Joi.string().trim().required(),
	lessonStartTime: Joi.string().trim().required(),
	lessonContinues: Joi.string().trim().required(),
	lessonWeekDay: Joi.string().trim().required(),
	groupStage_id: Joi.string().required(),
	roomNumber: Joi.string().trim().required(),
	roomFloor: Joi.number().required(),
	branch_id: Joi.string().trim().required(),
	lessonsQuant: Joi.number().required(),
	isActive: Joi.boolean(),
})

const groupUpdateVal = Joi.object({
	groupName: Joi.string().trim().required(),
	lessonStartTime: Joi.string().trim().required(),
	lessonContinues: Joi.string().trim().required(),
	lessonWeekDay: Joi.string().trim().required(),
	groupStage_id: Joi.string().required(),
	roomNumber: Joi.string().trim().required(),
	roomFloor: Joi.number().required(),
	branch_id: Joi.string().trim().required(),
	lessonsQuant: Joi.number().required(),
	isActive: Joi.boolean(),
})

module.exports = {
	groupRegisterVal,
	groupUpdateVal
}