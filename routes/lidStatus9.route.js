const { Router } = require('express')
const lidStatus = Router()

const {
	postLidStatus,
	getLidStatuss,
	getLidStatusById,
	updateLidStatus,
	deleteLidStatus,
} = require('../controllers/lidStatus9.controller')
const { lidStatusRegisterVal, lidStatusUpdateVal } = require('../validation/lidStatus9.validation')

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
 *   - name: LidStatus9
 *     description: lidStatus management
 */

/**
 * @swagger
 * /lidStatuss/postlidStatus:
 *   post:
 *     summary: Yangi lidStatus ro'yxatdan o'tkazish
 *     tags: [LidStatus9]
 *     description: Yangi lidStatus yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: lidStatus
 *     responses:
 *       "201":
 *         description: lidStatus muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
lidStatus.post('/postlidStatus', validateSchema(lidStatusRegisterVal), postLidStatus)

/**
 * @swagger
 * /lidStatuss/getlidStatuss:
 *   get:
 *     summary: Barcha lidStatuslarni olish
 *     tags: [LidStatus9]
 *     description: Barcha lidStatuslar ro'yxati
 *     responses:
 *       "200":
 *         description: lidStatuslar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
lidStatus.get('/getlidStatuss', getLidStatuss)

/**
 * @swagger
 * /lidStatuss/getlidStatusById/{id}:
 *   get:
 *     summary: lidStatusni ID orqali olish
 *     tags: [LidStatus9]
 *     description: Belgilangan lidStatusni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lidStatus ID
 *     responses:
 *       "200":
 *         description: lidStatus topildi
 *       "404":
 *         description: lidStatus topilmadi
 *       "500":
 *         description: Server xatosi
 */
lidStatus.get('/getlidStatusById/:id', getLidStatusById)

/**
 * @swagger
 * /lidStatuss/updatelidStatus/{id}:
 *   put:
 *     summary: lidStatusni yangilash
 *     tags: [LidStatus9]
 *     description: Belgilangan lidStatusni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lidStatus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              status:
 *                 type: string
 *                 description: lidStatus
 *     responses:
 *       "200":
 *         description: lidStatus yangilandi
 *       "404":
 *         description: lidStatus topilmadi
 *       "500":
 *         description: Server xatosi
 */
lidStatus.put('/updatelidStatus/:id', validateSchema(lidStatusUpdateVal), updateLidStatus)

/**
 * @swagger
 * /lidStatuss/deletelidStatus/{id}:
 *   delete:
 *     summary: lidStatusni o'chirish
 *     tags: [LidStatus9]
 *     description: Belgilangan lidStatusni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lidStatus ID
 *     responses:
 *       "200":
 *         description: lidStatus o'chirildi
 *       "404":
 *         description: lidStatus topilmadi
 *       "500":
 *         description: Server xatosi
 */
lidStatus.delete('/deletelidStatus/:id', deleteLidStatus)

module.exports = { lidStatus }
