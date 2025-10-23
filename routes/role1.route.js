const { Router } = require('express')
const role = Router()

const {
	postRole,
	getRoles,
	getRoleById,
	updateRole,
	deleteRole, } =
	require('../controllers/role1.controller')

const { roleRegisterVal, roleUpdatepdaVal } = require('../validation/role1.validation')

	const validateSchema = schema => (req,res,next) => {
		const validationResult = schema.validate(req.body)
		if (validationResult.error) {
			return res.status(400).send(validationResult.error.details[0].message)
		}
		next()
	}

/**
 * @swagger
 * tags:
 *   name: Roles1
 *   description: role managment
 */	

/**
 * @swagger
 * /roles/postRole:
 *   post:
 *     summary: Yangi role ro'yxatdan o'tkazish
 *     tags: [Roles1]
 *     description: Yangi role yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Foydalanuvchi yagona username
 *     responses:
 *       "201":
 *         description: Role muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Bad request, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */	
role.post('/postRole', validateSchema(roleRegisterVal), postRole)


/**
 * @swagger
 * /roles/getRoles:
 *   get:
 *     summary: hamma rolesni olish
 *     tags: [Roles1]
 *     description: hamma rolesni olish
 *     responses:
 *       "201":
 *          description: hamma roles royhati
 *       "500":
 *         description: Ichki server xatosi
 */
role.get('/getRoles', getRoles)


/**
 * @swagger
 * /roles/getRoleById/{id}:
 *   get:
 *     summary: rolesni alohida olish
 *     tags: [Roles1]
 *     description: rolesni alohida olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: role id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: role topildi
 *       "404":
 *          description: role topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
role.get('/getRoleById/:id', getRoleById)


/**
 * @swagger
 * /roles/updateRole/{id}:
 *   put:
 *     summary: role yangilash
 *     tags: [Roles1]
 *     description: role yagilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: role id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Foydalanuvchi yagona username
 *             required:
 *               - name
 *     responses:
 *       "200":
 *          description: role yangilandi
 *       "404":
 *          description: role topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
role.put('/updateRole/:id', validateSchema(roleUpdatepdaVal), updateRole)


/**
 * @swagger
 * /roles/deleteRole/{id}:
 *   delete:
 *     summary: roleni o`chirish
 *     tags: [Roles1]
 *     description: roleni o`chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: role id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: role o`chirildi
 *       "404":
 *          description: role topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
role.delete('/deleteRole/:id', deleteRole)

module.exports = { role }
