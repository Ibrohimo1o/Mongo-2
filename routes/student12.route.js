const { Router } = require('express')
const student = Router()

const {
  postStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/student12.controller')
const { studentRegisterVal, studentUpdateVal } = require('../validation/student12.validation')

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
 *     name: Student12
 *     description: Student management
 */

/**
 * @swagger
 * /students/postStudent:
 *   post:
 *     summary: Yangi student qo'shish
 *     tags: [Student12]
 *     description: Yangi student yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lid_id:
 *                 type: string
 *                 description: Lid ID
 *               firstName:
 *                 type: string
 *                 description: Student ismi
 *               lastName:
 *                 type: string
 *                 description: Student familiyasi
 *               phoneNumber:
 *                 type: string
 *                 description: Telefon raqami
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Tug‘ilgan sana
 *               gender:
 *                 type: string
 *                 description: Student jinsi
 *     responses:
 *       201:
 *         description: Student muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */
student.post('/postStudent', validateSchema(studentRegisterVal), postStudent)

/**
 * @swagger
 * /students/getStudents:
 *   get:
 *     summary: Barcha studentlarni olish
 *     tags: [Student12]
 *     description: Studentlar ro'yxatini olish
 *     responses:
 *       200:
 *         description: Studentlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
student.get('/getStudents', getStudents)

/**
 * @swagger
 * /students/getStudentById/{id}:
 *   get:
 *     summary: ID orqali student olish
 *     tags: [Student12]
 *     description: Studentni ID orqali olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student topildi
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Server xatosi
 */
student.get('/getStudentById/:id', getStudentById)

/**
 * @swagger
 * /students/updateStudent/{id}:
 *   put:
 *     summary: Studentni yangilash
 *     tags: [Student12]
 *     description: Student ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lid_id:
 *                 type: string
 *                 description: Lid ID
 *               firstName:
 *                 type: string
 *                 description: Student ismi
 *               lastName:
 *                 type: string
 *                 description: Student familiyasi
 *               phoneNumber:
 *                 type: string
 *                 description: Telefon raqami
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Tug‘ilgan sana
 *               gender:
 *                 type: string
 *                 description: Student jinsi
 *     responses:
 *       200:
 *         description: Student yangilandi
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Server xatosi
 */
student.put('/updateStudent/:id', validateSchema(studentUpdateVal), updateStudent)

/**
 * @swagger
 * /students/deleteStudent/{id}:
 *   delete:
 *     summary: Studentni o'chirish
 *     tags: [Student12]
 *     description: Studentni ID orqali o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student o'chirildi
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Server xatosi
 */
student.delete('/deleteStudent/:id', deleteStudent)

module.exports = { student }
