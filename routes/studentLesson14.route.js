const { Router } = require('express')
const studentLesson = Router()

const {
	postStudentLesson,
	getStudentLessons,
	getStudentLessonById,
	updateStudentLesson,
	deleteStudentLesson,
} = require('../controllers/studentLesson14.controller')
const { studentLessonRegisterVal, studentLessonUpdateVal } = require('../validation/studentLesson14.validation')

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
 *     name: StudentLesson14
 *     description: studentLesson management
 */

/**
 * @swagger
 * /studentLesson/poststudentLesson:
 *   post:
 *     summary: Yangi studentLessonqo'shish
 *     tags: [StudentLesson14]
 *     description: Yangi studentLessonyaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *                 description: Lesson ID
 *               student_id:
 *                 type: string
 *                 description: Student ID
 *               isThere:
 *                 type: boolean
 *                 description: bormi
 *               reason:
 *                 type: string
 *                 description: sabab
 *               bePaid:
 *                 type: boolean
 *                 description: pullikmi?
 *     responses:
 *       201:
 *         description: student Lesson muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */
studentLesson.post('/postStudentLesson', validateSchema(studentLessonRegisterVal), postStudentLesson)

/**
 * @swagger
 * /studentLesson/getstudentLessons:
 *   get:
 *     summary: Barcha studentlarni olish
 *     tags: [StudentLesson14]
 *     description: Studentlar ro'yxatini olish
 *     responses:
 *       200:
 *         description: Studentlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
studentLesson.get('/getStudentLessons', getStudentLessons)

/**
 * @swagger
 * /studentLesson/getstudentLessonById/{id}:
 *   get:
 *     summary: ID orqali studentLessonolish
 *     tags: [StudentLesson14]
 *     description: Studentni ID orqali olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: studentLessonID
 *     responses:
 *       200:
 *         description: studentLessontopildi
 *       404:
 *         description: studentLessontopilmadi
 *       500:
 *         description: Server xatosi
 */
studentLesson.get('/getStudentLessonById/:id', getStudentLessonById)

/**
 * @swagger
 * /studentLesson/updatestudentLesson/{id}:
 *   put:
 *     summary: Studentni yangilash
 *     tags: [StudentLesson14]
 *     description: studentLessonma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: studentLessonID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *                 description: Lesson ID
 *               student_id:
 *                 type: string
 *                 description: Student ID
 *               isThere:
 *                 type: boolean
 *                 description: bormi
 *               reason:
 *                 type: string
 *                 description: sabab
 *               bePaid:
 *                 type: boolean
 *                 description: pullikmi?
 *     responses:
 *       200:
 *         description: studentLessonyangilandi
 *       404:
 *         description: studentLessontopilmadi
 *       500:
 *         description: Server xatosi
 */
studentLesson.put('/updateStudentLesson/:id', validateSchema(studentLessonUpdateVal), updateStudentLesson)

/**
 * @swagger
 * /studentLesson/deletestudentLesson/{id}:
 *   delete:
 *     summary: StudentniLessonni o'chirish
 *     tags: [StudentLesson14]
 *     description: Studentni ID orqali o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: studentLessonID
 *     responses:
 *       200:
 *         description: studentLessono'chirildi
 *       404:
 *         description: studentLessontopilmadi
 *       500:
 *         description: Server xatosi
 */
studentLesson.delete('/deleteStudentLesson/:id', deleteStudentLesson)

module.exports = { studentLesson }
