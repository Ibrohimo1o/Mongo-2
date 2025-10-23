const { Router } = require('express')
const reasonLid = Router()

const {
	postReasonLid,
	getReasonLids,
	getReasonLidById,
	updateReasonLid,
	deleteReasonLid,
} = require('../controllers/reasonLid10.controller')
const { reasonLidRegisterVal, reasonLidUpdateVal } = require('../validation/reasonLid10.validation')

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
 *   - name: reasonLid10
 *     description: reasonLid management
 */

/**
 * @swagger
 * /reasonLids/postreasonLid:
 *   post:
 *     summary: Yangi reasonLid ro'yxatdan o'tkazish
 *     tags: [reasonLid10]
 *     description: Yangi reasonLid yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reasonLid:
 *                 type: string
 *                 description: reasonLid 
 *     responses:
 *       "201":
 *         description: reasonLid muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
reasonLid.post('/postreasonLid', validateSchema(reasonLidRegisterVal), postReasonLid)

/**
 * @swagger
 * /reasonLids/getreasonLids:
 *   get:
 *     summary: Barcha reasonLidlarni olish
 *     tags: [reasonLid10]
 *     description: Barcha reasonLidlar ro'yxati
 *     responses:
 *       "200":
 *         description: reasonLidlar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
reasonLid.get('/getreasonLids', getReasonLids)

/**
 * @swagger
 * /reasonLids/getreasonLidById/{id}:
 *   get:
 *     summary: reasonLidni ID orqali olish
 *     tags: [reasonLid10]
 *     description: Belgilangan reasonLidni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: reasonLid ID
 *     responses:
 *       "200":
 *         description: reasonLid topildi
 *       "404":
 *         description: reasonLid topilmadi
 *       "500":
 *         description: Server xatosi
 */
reasonLid.get('/getreasonLidById/:id', getReasonLidById)

/**
 * @swagger
 * /reasonLids/updatereasonLid/{id}:
 *   put:
 *     summary: reasonLidni yangilash
 *     tags: [reasonLid10]
 *     description: Belgilangan reasonLidni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: reasonLid ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             reasonLid:
 *                 type: string
 *                 description: reasonLid 
 *     responses:
 *       "200":
 *         description: reasonLid yangilandi
 *       "404":
 *         description: reasonLid topilmadi
 *       "500":
 *         description: Server xatosi
 */
reasonLid.put('/updatereasonLid/:id', validateSchema(reasonLidUpdateVal), updateReasonLid)

/**
 * @swagger
 * /reasonLids/deletereasonLid/{id}:
 *   delete:
 *     summary: reasonLidni o'chirish
 *     tags: [reasonLid10]
 *     description: Belgilangan reasonLidni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: reasonLid ID
 *     responses:
 *       "200":
 *         description: reasonLid o'chirildi
 *       "404":
 *         description: reasonLid topilmadi
 *       "500":
 *         description: Server xatosi
 */
reasonLid.delete('/deletereasonLid/:id', deleteReasonLid)

module.exports = { reasonLid }
