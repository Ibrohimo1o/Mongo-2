const { Router } = require('express')
const lidRouter = Router()

const {
  postLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
} = require('../controllers/lid11.controller')
const { lidRegisterVal, lidUpdateVal } = require('../validation/lid11.validation')

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
 *   - name: Lid11
 *     description: Lid management
 */

/**
 * @swagger
 * /lids/postLid:
 *   post:
 *     summary: Yangi Lid ro'yxatdan o'tkazish
 *     tags: [Lid11]
 *     description: Yangi Lid yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Lid ismi
 *               lastName:
 *                 type: string
 *                 description: Lid familiyasi
 *               phoneNumber:
 *                 type: string
 *                 description: Telefon raqami
 *               lidStage_id:
 *                 type: string
 *                 description: LidStage ID
 *               testDate:
 *                 type: string
 *                 format: date
 *                 description: Test sanasi
 *               trialLessonDate:
 *                 type: string
 *                 format: date
 *                 description: Sinov dars sanasi
 *               trialLessonTime:
 *                 type: string
 *                 description: Sinov dars vaqti
 *               trialLessonGroup_id:
 *                 type: string
 *                 description: Sinov dars guruhi ID
 *               lidStatus_id:
 *                 type: string
 *                 description: LidStatus ID
 *               cancelReason_id:
 *                 type: string
 *                 description: Bekor qilish sababi ID
 *     responses:
 *       "201":
 *         description: Lid muvaffaqiyatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
lidRouter.post('/postLid', validateSchema(lidRegisterVal), postLid)

/**
 * @swagger
 * /lids/getLids:
 *   get:
 *     summary: Barcha Lidlarni olish
 *     tags: [Lid11]
 *     description: Barcha Lidlar ro'yxati
 *     responses:
 *       "200":
 *         description: Lidlar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
lidRouter.get('/getLids', getLids)

/**
 * @swagger
 * /lids/getLidById/{id}:
 *   get:
 *     summary: ID orqali bitta Lidni olish
 *     tags: [Lid11]
 *     description: Belgilangan Lidni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lid ID
 *     responses:
 *       "200":
 *         description: Lid topildi
 *       "404":
 *         description: Lid topilmadi
 *       "500":
 *         description: Server xatosi
 */
lidRouter.get('/getLidById/:id', getLidById)

/**
 * @swagger
 * /lids/updateLid/{id}:
 *   put:
 *     summary: Lidni yangilash
 *     tags: [Lid11]
 *     description: Belgilangan Lidni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lid ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Lid ismi
 *               lastName:
 *                 type: string
 *                 description: Lid familiyasi
 *               phoneNumber:
 *                 type: string
 *                 description: Telefon raqami
 *               lidStage_id:
 *                 type: string
 *                 description: LidStage ID
 *               testDate:
 *                 type: string
 *                 format: date
 *                 description: Test sanasi
 *               trialLessonDate:
 *                 type: string
 *                 format: date
 *                 description: Sinov dars sanasi
 *               trialLessonTime:
 *                 type: string
 *                 description: Sinov dars vaqti
 *               trialLessonGroup_id:
 *                 type: string
 *                 description: Sinov dars guruhi ID
 *               lidStatus_id:
 *                 type: string
 *                 description: LidStatus ID
 *               cancelReason_id:
 *                 type: string
 *                 description: Bekor qilish sababi ID
 *     responses:
 *       "200":
 *         description: Lid yangilandi
 *       "404":
 *         description: Lid topilmadi
 *       "500":
 *         description: Server xatosi
 */
lidRouter.put('/updateLid/:id', validateSchema(lidUpdateVal), updateLid)

/**
 * @swagger
 * /lids/deleteLid/{id}:
 *   delete:
 *     summary: Lidni o'chirish
 *     tags: [Lid11]
 *     description: Belgilangan Lidni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lid ID
 *     responses:
 *       "200":
 *         description: Lid o'chirildi
 *       "404":
 *         description: Lid topilmadi
 *       "500":
 *         description: Server xatosi
 */
lidRouter.delete('/deleteLid/:id', deleteLid)

module.exports = { lidRouter }
