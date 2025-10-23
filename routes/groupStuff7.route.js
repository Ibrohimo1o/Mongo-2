const { Router } = require('express')
const GroupStuff = Router()

const {
	postGroupStuff,
	getGroupStuffs,
	getGroupStuffById,
	updateGroupStuff,
	deleteGroupStuff,
} = require('../controllers/groupStuff7.controller')
const { groupStuffRegisterVal, groupStuffUpdateVal } = require('../validation/groupStuff7.validation')


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
 *   - name: GroupStuff7
 *     description: GroupStuff management
 */

/**
 * @swagger
 * /GroupStuffs/postGroupStuff:
 *   post:
 *     summary: Yangi GroupStuff ro'yxatdan o'tkazish
 *     tags: [GroupStuff7]
 *     description: Yangi GroupStuff yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *                 description: group id
 *               stuff_id:
 *                 type: string
 *                 description: stuff id
 *     responses:
 *       "201":
 *         description: GroupStuff muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
GroupStuff.post('/postGroupStuff',  validateSchema(groupStuffRegisterVal), postGroupStuff)

/**
 * @swagger
 * /GroupStuffs/getGroupStuffs:
 *   get:
 *     summary: Barcha GroupStufflarni olish
 *     tags: [GroupStuff7]
 *     description: Barcha GroupStufflar ro'yxati
 *     responses:
 *       "200":
 *         description: GroupStufflar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
GroupStuff.get('/getGroupStuffs', getGroupStuffs)

/**
 * @swagger
 * /GroupStuffs/getGroupStuffById/{id}:
 *   get:
 *     summary: GroupStuffni ID orqali olish
 *     tags: [GroupStuff7]
 *     description: Belgilangan GroupStuffni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: GroupStuff ID
 *     responses:
 *       "200":
 *         description: GroupStuff topildi
 *       "404":
 *         description: GroupStuff topilmadi
 *       "500":
 *         description: Server xatosi
 */
GroupStuff.get('/getGroupStuffById/:id', getGroupStuffById)

/**
 * @swagger
 * /GroupStuffs/updateGroupStuff/{id}:
 *   put:
 *     summary: GroupStuffni yangilash
 *     tags: [GroupStuff7]
 *     description: Belgilangan GroupStuffni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: GroupStuff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *                 description: group id
 *               stuff_id:
 *                 type: string
 *                 description: stuff id
 *     responses:
 *       "200":
 *         description: GroupStuff yangilandi
 *       "404":
 *         description: GroupStuff topilmadi
 *       "500":
 *         description: Server xatosi
 */
GroupStuff.put('/updateGroupStuff/:id', validateSchema(groupStuffUpdateVal), updateGroupStuff)

/**
 * @swagger
 * /GroupStuffs/deleteGroupStuff/{id}:
 *   delete:
 *     summary: GroupStuffni o'chirish
 *     tags: [GroupStuff7]
 *     description: Belgilangan GroupStuffni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: GroupStuff ID
 *     responses:
 *       "200":
 *         description: GroupStuff o'chirildi
 *       "404":
 *         description: GroupStuff topilmadi
 *       "500":
 *         description: Server xatosi
 */
GroupStuff.delete('/deleteGroupStuff/:id', deleteGroupStuff)

module.exports = { GroupStuff }
