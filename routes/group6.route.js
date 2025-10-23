const { Router } = require('express')
const Group = Router()

const {
	postGroup,
	getGroups,
	getGroupById,
	updateGroup,
	deleteGroup,
} = require('../controllers/group6.controller')
const { groupRegisterVal, groupUpdateVal } = require('../validation/group6.validation')


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
 *   - name: Group6
 *     description: Group management
 */

/**
 * @swagger
 * /Groups/postGroup:
 *   post:
 *     summary: Yangi Group ro'yxatdan o'tkazish
 *     tags: [Group6]
 *     description: Yangi Group yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *                 description: Group nomi
 *               lessonStartTime:
 *                 type: string
 *                 description: Dars boshlanishi
 *               lessonContinues:
 *                 type: string
 *                 description: Dars davomliligi
 *               lessonWeekDay:
 *                 type: string
 *                 description: Dars hafta kunlarida
 *               groupStage_id:
 *                 type: string
 *                 description: groupStage id
 *               roomNumber:
 *                 type: string
 *                 description: xona raqami
 *               roomFloor:
 *                 type: number
 *                 description: xona etaji
 *               branch_id:
 *                 type: string
 *                 description: branch id
 *               lessonsQuant:
 *                 type: number
 *                 description: Darslik soni
 *               isActive:
 *                 type: boolean
 *                 description: Active mi?
 *     responses:
 *       "201":
 *         description: Group muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
Group.post('/postGroup', validateSchema(groupRegisterVal), postGroup)

/**
 * @swagger
 * /Groups/getGroups:
 *   get:
 *     summary: Barcha Grouplarni olish
 *     tags: [Group6]
 *     description: Barcha Grouplar ro'yxati
 *     responses:
 *       "200":
 *         description: Grouplar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
Group.get('/getGroups', getGroups)

/**
 * @swagger
 * /Groups/getGroupById/{id}:
 *   get:
 *     summary: Groupni ID orqali olish
 *     tags: [Group6]
 *     description: Belgilangan Groupni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       "200":
 *         description: Group topildi
 *       "404":
 *         description: Group topilmadi
 *       "500":
 *         description: Server xatosi
 */
Group.get('/getGroupById/:id', getGroupById)

/**
 * @swagger
 * /Groups/updateGroup/{id}:
 *   put:
 *     summary: Groupni yangilash
 *     tags: [Group6]
 *     description: Belgilangan Groupni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *                 description: Group nomi
 *               lessonStartTime:
 *                 type: string
 *                 description: Dars boshlanishi
 *               lessonContinues:
 *                 type: string
 *                 description: Dars davomliligi
 *               lessonWeekDay:
 *                 type: string
 *                 description: Dars hafta kunlarida
 *               groupStage_id:
 *                 type: number
 *                 description: groupStage id
 *               roomNumber:
 *                 type: string
 *                 description: xona raqami
 *               roomFloor:
 *                 type: number
 *                 description: xona etaji
 *               branch_id:
 *                 type: string
 *                 description: branch id
 *               lessonsQuant:
 *                 type: number
 *                 description: Darslik soni
 *               isActive:
 *                 type: boolean
 *                 description: Active mi?
 *     responses:
 *       "200":
 *         description: Group yangilandi
 *       "404":
 *         description: Group topilmadi
 *       "500":
 *         description: Server xatosi
 */
Group.put('/updateGroup/:id', validateSchema(groupUpdateVal), updateGroup)

/**
 * @swagger
 * /Groups/deleteGroup/{id}:
 *   delete:
 *     summary: Groupni o'chirish
 *     tags: [Group6]
 *     description: Belgilangan Groupni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       "200":
 *         description: Group o'chirildi
 *       "404":
 *         description: Group topilmadi
 *       "500":
 *         description: Server xatosi
 */
Group.delete('/deleteGroup/:id', deleteGroup)

module.exports = { Group }
