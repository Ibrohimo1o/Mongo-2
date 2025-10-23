const { Router } = require('express')
const Stage = Router()

const {
  postStage,
  getStages,
  getStageById,
  updateStage,
  deleteStage, } =
  require('../controllers/stage4.controller')
const { stageRegisterVal, stageUpdateVal } = require('../validation/stage4.validation')


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
 *   name: Stages4
 *   description: Stage managment
 */

/**
 * @swagger
 * /Stages/postStage:
 *   post:
 *     summary: Yangi Stage ro'yxatdan o'tkazish
 *     tags: [Stages4]
 *     description: Yangi Stage yaratish
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
 *         description: Stage muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Bad request, validatsiya xatosi
 *       "500":
 *         description: Ichki server xatosi
 */
Stage.post('/postStage', validateSchema(stageRegisterVal), postStage)



/**
 * @swagger
 * /Stages/getStages:
 *   get:
 *     summary: hamma Stagesni olish
 *     tags: [Stages4]
 *     description: hamma Stagesni olish
 *     responses:
 *       "201":
 *          description: hamma Stages royhati
 *       "500":
 *         description: Ichki server xatosi
 */
Stage.get('/getStages', getStages)


/**
 * @swagger
 * /Stages/getStageById/{id}:
 *   get:
 *     summary: Stagesni alohida olish
 *     tags: [Stages4]
 *     description: Stagesni alohida olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stage id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: Stage topildi
 *       "404":
 *          description: Stage topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
Stage.get('/getStageById/:id', getStageById)


/**
 * @swagger
 * /Stages/updateStage/{id}:
 *   put:
 *     summary: Stage yangilash
 *     tags: [Stages4]
 *     description: Stage yagilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stage id
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
 *          description: Stage yangilandi
 *       "404":
 *          description: Stage topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
Stage.put('/updateStage/:id', validateSchema(stageUpdateVal), updateStage)


/**
 * @swagger
 * /Stages/deleteStage/{id}:
 *   delete:
 *     summary: Stageni o`chirish
 *     tags: [Stages4]
 *     description: Stageni o`chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stage id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *          description: Stage o`chirildi
 *       "404":
 *          description: Stage topilmadi
 *       "500":
 *         description: Ichki server xatosi
 */
Stage.delete('/deleteStage/:id', deleteStage)

module.exports = { Stage }
