const Joi = require("joi")

const studentsGroupsRegisgterVal = Joi.object({
	student_id: Joi.string().required(),
	group_id: Joi.string().required(),
})

const studentsGroupUpdateVal = Joi.object({
	student_id: Joi.string().required(),
	group_id: Joi.string().required(),
})

module.exports = {
	studentsGroupsRegisgterVal,
	studentsGroupUpdateVal
}