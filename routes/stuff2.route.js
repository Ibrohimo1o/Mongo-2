const {Router} = require('express')
const stuff = Router()

const {
	postStuff,
  getStuffs,
  getStuffById,
  updateStuff,
  deleteStuff,
} = require('../controllers/stuff2.controller')
const { stuffRegisterVal, stuffUpdateVal } = require('../validation/stuff2.validation')



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
 *   name: Stuffs2
 *   description: role managment
 */	



/**
 * @swagger
 * /stuffs/postStuff:
 *   post:
 *     summary: Yangi stuff ro'yxatdan o'tkazish
 *     tags: [Stuffs2]
 *     description: Yangi stuff yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Stuff yagona firstName
 *               lastName:
 *                 type: string
 *                 description: Stuff yagona lastName
 *               phoneNumber:
 *                 type: string
 *                 description: Stuff yagona phoneNumber
 *               login:
 *                 type: string
 *                 description: Stuff yagona login
 *               parol:
 *                 type: string
 *                 description: Stuff yagona parol
 *               isActive:
 *                 type: boolean
 *                 description: Stuff yagona isActive
 *     responses:
 *       "201":
 *         description: Stuff muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Bad request, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */	
stuff.post('/postStuff', validateSchema(stuffRegisterVal), postStuff)

/**
 * @swagger
 * /stuffs/getStuffs:
 *   get:
 *     summary: hamma stufflarni olish
 *     tags: [Stuffs2]
 *     description: hamma stufflarni olish
 *     responses:
 *       "201":
 *          description: hamma stufflar royhati
 *       "500":
 *         description: Ichki server xatosi
 */
stuff.get('/getStuffs', getStuffs)

/**
 * @swagger
 * /stuffs/getStuffById/{id}:
 *   get:
 *     summary: stuffni alohida olish
 *     tags: [Stuffs2]
 *     description: stuffni alohida olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: stuff id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: stuff topildi
 *       "404":
 *          description: stuff topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuff.get('/getStuffById/:id', getStuffById)


/**
 * @swagger
 * /stuffs/updateStuff/{id}:
 *   put:
 *     summary: Stuffni yangilash
 *     tags: [Stuffs2]
 *     description: Stuff ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stuff ID
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               login:
 *                 type: string
 *               parol:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: Stuff yangilandi
 *       "404":
 *         description: Stuff topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */

stuff.put('/updateStuff/:id', validateSchema(stuffUpdateVal), updateStuff)


/**
 * @swagger
 * /stuffs/deleteStuff/{id}:
 *   delete:
 *     summary: roleni o`chirish
 *     tags: [Stuffs2]
 *     description: stuffni o`chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: stuff id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: stuff o`chirildi
 *       "404":
 *          description: stuff topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
stuff.delete('/deleteStuff/:id', deleteStuff)

module.exports = {stuff}