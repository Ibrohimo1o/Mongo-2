const { Router } = require('express')
const Payment = Router()

const {
	postPayment,
	getPayments,
	getPaymentById,
	updatePayment,
	deletePayment,
} = require('../controllers/payment15.controller')
const { paymentRegisterVal, paymentUpdateVal } = require('../validation/payment15.validation')

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
 *     name: payment15
 *     description: Payment management
 */

/**
 * @swagger
 * /Payment/postPayment:
 *   post:
 *     summary: Yangi Payment qo'shish
 *     tags: [payment15]
 *     description: Yangi Payment yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: student ID
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 description: oxirgi tolov sanasi
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 description: to'lov kuni
 *               price:
 *                 type: number
 *                 description: narxi
 *               isPaid:
 *                 type: boolean
 *                 description: pullikmi?
 *               totalAttent:
 *                 type: number
 *                 description: to'liq
 *     responses:
 *       201:
 *         description: Payment muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */

Payment.post('/postPayment', validateSchema(paymentRegisterVal), postPayment)

/**
 * @swagger
 * /Payment/getPayments:
 *   get:
 *     summary: Barcha paymentlarni olish
 *     tags: [payment15]
 *     description: Paymentlar ro'yxatini olish
 *     responses:
 *       200:
 *         description: Paymentlar ro'yxati
 *       500:
 *         description: Server xatosi
 */
Payment.get('/getPayments', getPayments)

/**
 * @swagger
 * /Payment/getPaymentById/{id}:
 *   get:
 *     summary: ID orqali Payment olish
 *     tags: [payment15]
 *     description: Paymentni ID orqali olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment topildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Server xatosi
 */
Payment.get('/getPaymentById/:id', getPaymentById)

/**
 * @swagger
 * /Payment/updatePayment/{id}:
 *   put:
 *     summary: Paymentni yangilash
 *     tags: [payment15]
 *     description: Payment ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: student ID
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 description: oxirgi tolov sanasi
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 description: to'lov kuni
 *               price:
 *                 type: number
 *                 description: narxi
 *               isPaid:
 *                 type: boolean
 *                 description: pullikmi?
 *               totalAttent:
 *                 type: number
 *                 description: to'liq
 *     responses:
 *       200:
 *         description: Payment yangilandi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Server xatosi
 */
Payment.put('/updatePayment/:id', validateSchema(paymentUpdateVal), updatePayment)


/**
 * @swagger
 * /Payment/deletePayment/{id}:
 *   delete:
 *     summary: Paymentni o'chirish
 *     tags: [payment15]
 *     description: Paymentni ID orqali o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment o'chirildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Server xatosi
 */
Payment.delete('/deletePayment/:id', deletePayment)

module.exports = { Payment }
