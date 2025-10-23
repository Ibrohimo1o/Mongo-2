const { Router } = require('express')
const studentsGroup= Router()

const {
	postStudentsGroup,
	getStudentsGroups,
	getStudentsGroupById,
	updateStudentsGroup,
	deleteStudentsGroup,
} = require('../controllers/studentsGroup13.controller')
const { studentsGroupsRegisgterVal, studentsGroupUpdateVal } = require('../validation/studentsGroup13.validation')

const validateSchema = schema => (req, res, next) => {
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message)
  }
  next()
}

/**
 * @swagger
 * tags:
 *     name: StudentsGroup13
 *     description: studentsGroupmanagement
 */

/**
 * @swagger
 * /studentsGroup/postStudentsGroup:
 *   post:
 *     summary: Yangi studentsGroupqo'shish
 *     tags: [StudentsGroup13]
 *     description: Yangi studentsGroupyaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: Student ID
 *               group_id:
 *                 type: string
 *                 description: Group ID
 *     responses:
 *       201:
 *         description: studentsGroup muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */
studentsGroup.post('/postStudentsGroup', validateSchema(studentsGroupsRegisgterVal), postStudentsGroup)

/**
 * @swagger
 * /studentsGroup/getStudentsGroups:
 *   get:
 *     summary: Barcha studentlarni olish
 *     tags: [StudentsGroup13]
 *     description: Studentlar ro'yxatini olish
 *     responses:
 *       200:
 *         description: Studentlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
studentsGroup.get('/getStudentsGroups', getStudentsGroups)

/**
 * @swagger
 * /studentsGroup/getStudentsGroupById/{id}:
 *   get:
 *     summary: ID orqali studentsGroupolish
 *     tags: [StudentsGroup13]
 *     description: Studentni ID orqali olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: studentsGroupID
 *     responses:
 *       200:
 *         description: studentsGrouptopildi
 *       404:
 *         description: studentsGrouptopilmadi
 *       500:
 *         description: Server xatosi
 */
studentsGroup.get('/getStudentsGroupById/:id', getStudentsGroupById)

/**
 * @swagger
 * /studentsGroup/updateStudentsGroup/{id}:
 *   put:
 *     summary: Studentni yangilash
 *     tags: [StudentsGroup13]
 *     description: studentsGroupma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: studentsGroupID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: Student ID
 *               group_id:
 *                 type: string
 *                 description: Group ID
 *     responses:
 *       200:
 *         description: studentsGroupyangilandi
 *       404:
 *         description: studentsGrouptopilmadi
 *       500:
 *         description: Server xatosi
 */
studentsGroup.put('/updateStudentsGroup/:id', validateSchema(studentsGroupUpdateVal), updateStudentsGroup)

/**
 * @swagger
 * /studentsGroup/deleteStudentsGroup/{id}:
 *   delete:
 *     summary: StudentniGroupni o'chirish
 *     tags: [StudentsGroup13]
 *     description: Studentni ID orqali o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: studentsGroupID
 *     responses:
 *       200:
 *         description: studentsGroupo'chirildi
 *       404:
 *         description: studentsGrouptopilmadi
 *       500:
 *         description: Server xatosi
 */
studentsGroup.delete('/deleteStudentsGroup/:id', deleteStudentsGroup)

module.exports = { studentsGroup}
