const { Router } = require('express')
const Lesson = Router()

const {
  postLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require('../controllers/lesson8.controller')
const { lessonRegisterVal, lessonUpdateVal } = require('../validation/lesson8.validation')


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
 *   - name: Lesson8
 *     description: Lesson management
 */

/**
 * @swagger
 * /Lessons/postLesson:
 *   post:
 *     summary: Yangi Lesson ro'yxatdan o'tkazish
 *     tags: [Lesson8]
 *     description: Yangi Lesson yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonTheme:
 *                 type: string
 *                 description: dars mavzusi
 *               lessonNumber:
 *                 type: number
 *                 description: dars jadval raqami
 *               group_id:
 *                 type: string
 *                 description: group id
 *               lessonDate:
 *                 type: string
 *                 format: date
 *                 description: dars vaqti
 *     responses:
 *       "201":
 *         description: Lesson muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
Lesson.post('/postLesson', validateSchema(lessonRegisterVal), postLesson)

/**
 * @swagger
 * /Lessons/getLessons:
 *   get:
 *     summary: Barcha Lessonlarni olish
 *     tags: [Lesson8]
 *     description: Barcha Lessonlar ro'yxati
 *     responses:
 *       "200":
 *         description: Lessonlar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
Lesson.get('/getLessons', getLessons)

/**
 * @swagger
 * /Lessons/getLessonById/{id}:
 *   get:
 *     summary: Lessonni ID orqali olish
 *     tags: [Lesson8]
 *     description: Belgilangan Lessonni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *     responses:
 *       "200":
 *         description: Lesson topildi
 *       "404":
 *         description: Lesson topilmadi
 *       "500":
 *         description: Server xatosi
 */
Lesson.get('/getLessonById/:id', getLessonById)

/**
 * @swagger
 * /Lessons/updateLesson/{id}:
 *   put:
 *     summary: Lessonni yangilash
 *     tags: [Lesson8]
 *     description: Belgilangan Lessonni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonTheme:
 *                 type: string
 *                 description: dars mavzusi
 *               lessonNumber:
 *                 type: number
 *                 description: dars jadval raqami
 *               group_id:
 *                 type: string
 *                 description: group id
 *               lessonDate:
 *                 type: string
 *                 format: date
 *                 description: dars vaqti
 *     responses:
 *       "200":
 *         description: Lesson yangilandi
 *       "404":
 *         description: Lesson topilmadi
 *       "500":
 *         description: Server xatosi
 */
Lesson.put('/updateLesson/:id', validateSchema(lessonUpdateVal), updateLesson)

/**
 * @swagger
 * /Lessons/deleteLesson/{id}:
 *   delete:
 *     summary: Lessonni o'chirish
 *     tags: [Lesson8]
 *     description: Belgilangan Lessonni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson ID
 *     responses:
 *       "200":
 *         description: Lesson o'chirildi
 *       "404":
 *         description: Lesson topilmadi
 *       "500":
 *         description: Server xatosi
 */
Lesson.delete('/deleteLesson/:id', deleteLesson)

module.exports = { Lesson }
