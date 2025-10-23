const { Router } = require('express')
const stuffRole = Router()

const {
	postStuffRole,
	getStuffRoles,
	getStuffRoleById,
	updateStuffRole,
	deleteStuffRole,
} = require('../controllers/stuffRole3.controller')
const { stuffRoleUpdateVal,stuffRoleRegisterVal } = require('../validation/stuffRole3.validation')



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
 *   name: StuffRoles3
 *   description: stuffRoles managment
 */	



/**
 * @swagger
 * /stuffRole/stuffRolePost:
 *   post:
 *     summary: Yangi StuffRole ro'yxatdan o'tkazish
 *     tags: [StuffRoles3]
 *     description: Yangi StuffRole yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *                 description: Stuff_id yagona 
 *               role_id:
 *                 type: string
 *                 description: Role_id yagona 
 *     responses:
 *       "201":
 *         description: StuffRole muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Bad request, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */	
stuffRole.post('/stuffRolePost', validateSchema(stuffRoleRegisterVal), postStuffRole)

/**
 * @swagger
 * /stuffRole/getStuffRoles:
 *   get:
 *     summary: hamma stuffRolelarni olish
 *     tags: [StuffRoles3]
 *     description: hamma stuffRolelarni olish
 *     responses:
 *       "201":
 *          description: hamma stuffRolelarni royhati
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.get('/getStuffRoles', getStuffRoles)

/**
 * @swagger
 * /stuffRole/getStuffRoleById/{id}:
 *   get:
 *     summary: stuffRolelarni alohida olish
 *     tags: [StuffRoles3]
 *     description: stuffRolelarni alohida olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: stuffRole id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: stuffRole topildi
 *       "404":
 *          description: stuffRole topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.get('/getStuffRoleById/:id', getStuffRoleById)


/**
 * @swagger
 * /stuffRole/updateStuffRole/{id}:
 *   put:
 *     summary: StuffRole ni yangilash
 *     tags: [StuffRoles3]
 *     description: StuffRole ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StuffRole ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *                 description: Stuff ID
 *               role_id:
 *                 type: string
 *                 description: Role ID
 *     responses:
 *       "200":
 *         description: StuffRole yangilandi
 *       "404":
 *         description: StuffRole topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.put('/updateStuffRole/:id', validateSchema(stuffRoleUpdateVal), updateStuffRole)


/**
 * @swagger
 * /stuffRole/deleteStuffRole/{id}:
 *   delete:
 *     summary: StuffRole ni o‘chirish
 *     tags: [StuffRoles3]
 *     description: StuffRole ni o‘chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StuffRole ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: StuffRole o‘chirildi
 *       "404":
 *         description: StuffRole topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuffRole.delete('/deleteStuffRole/:id', deleteStuffRole)


module.exports = { stuffRole }