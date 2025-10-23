const { Router } = require('express')
const Branch = Router()

const {
  postBranch,
  getBranchs,
  getBranchById,
  updateBranch,
  deleteBranch
} = require('../controllers/branch5.controller')
const { branchRegisterVal, branchUpdateVal } = require('../validation/branch5.validation')


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
 *   - name: Branch5
 *     description: Branch management
 */

/**
 * @swagger
 * /Branchs/postBranch:
 *   post:
 *     summary: Yangi Branch ro'yxatdan o'tkazish
 *     tags: [Branch5]
 *     description: Yangi Branch yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Branch nomi
 *               address:
 *                 type: string
 *                 description: Branch manzili
 *               callNumber:
 *                 type: string
 *                 description: Branch telefon raqami
 *             required:
 *               - name
 *               - address
 *               - callNumber
 *     responses:
 *       "201":
 *         description: Branch muvaffaqatli ro'yxatdan o'tdi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
Branch.post('/postBranch', validateSchema(branchRegisterVal), postBranch)

/**
 * @swagger
 * /Branchs/getBranchs:
 *   get:
 *     summary: Barcha Branchlarni olish
 *     tags: [Branch5]
 *     description: Barcha branchlar ro'yxati
 *     responses:
 *       "200":
 *         description: Branchlar ro'yxati
 *       "500":
 *         description: Server xatosi
 */
Branch.get('/getBranchs', getBranchs)

/**
 * @swagger
 * /Branchs/getBranchById/{id}:
 *   get:
 *     summary: Branchni ID orqali olish
 *     tags: [Branch5]
 *     description: Belgilangan branchni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       "200":
 *         description: Branch topildi
 *       "404":
 *         description: Branch topilmadi
 *       "500":
 *         description: Server xatosi
 */
Branch.get('/getBranchById/:id', getBranchById)

/**
 * @swagger
 * /Branchs/updateBranch/{id}:
 *   put:
 *     summary: Branchni yangilash
 *     tags: [Branch5]
 *     description: Belgilangan branchni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               callNumber:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       "200":
 *         description: Branch yangilandi
 *       "404":
 *         description: Branch topilmadi
 *       "500":
 *         description: Server xatosi
 */
Branch.put('/updateBranch/:id', validateSchema(branchUpdateVal), updateBranch)

/**
 * @swagger
 * /Branchs/deleteBranch/{id}:
 *   delete:
 *     summary: Branchni o'chirish
 *     tags: [Branch5]
 *     description: Belgilangan branchni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       "200":
 *         description: Branch o'chirildi
 *       "404":
 *         description: Branch topilmadi
 *       "500":
 *         description: Server xatosi
 */
Branch.delete('/deleteBranch/:id', deleteBranch)

module.exports = { Branch }
