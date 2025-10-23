const { Stage } = require('../models/model4.Stage')

// Post
const postStage = async (req, res) => {
  try {
    const {
     name
    } = req.body
    const existingStage = await Stage.findOne({ name })

    console.log(existingStage)

    if (existingStage) {
      return res.status(400).json({
        success: false,
        message: 'Bu nom bilan royhatdan otgan foydanaluvchi mavjud.',
      })
    } else {
      
      const newStage = new Stage({
       name
      })
      await newStage.save()
      return res.status(201).json({
        success: true,
        message: 'Royhatdan otish muvaqattali yakulandi.',
      })
    }
  } catch (error) {
    console.error('Xato:', error)
    return res.status(500).json({
      success: false,
      message: 'Server xatosi: Royhatdan otish jarayonda xato yuz berdi',
    })
  }
}

// Get
const getStages = async (req, res) => {
  try {
    const Stages = await Stage.find({})
    res.json({
      success: true,
      message: 'Barcha Stagellar royxati olingan.',
      innerData: Stages,
    })
  } catch (error) {
    console.error('Error fetching Stages:', error)
    res.status(500).json({
      success: false,
      message: 'Server xatosi: Stage olishida xato yuz berdi.',
    })
  }
}

// GetUserById
const getStageById = async (req, res) => {
  try {
    const StageId = req.params.id

    const stageDate = await Stage.findById(StageId)

    if (!stageDate) {
      return res.status(404).json({ message: 'Stage not found' })
    }

    res.json({ message: 'Stage found', stageDate })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update
const updateStage = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const updateStage = await Stage.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    )

    if (!updateStage) {
      return res.status(404).json({
        success: false,
        message: 'Stage not found!',
      })
    }
    res.json({
      success: true,
      message: 'Stage updated successfully!',
      user: updateStage,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}

// Delete
const deleteStage = async (req, res) => {
  try {
    const StageId = req.params.id

    const deleteStage = await Stage.findByIdAndDelete(StageId)

    if (!deleteStage) {
      return res.status(404).json({ message: 'Stage not found' })
    }
    res.json({ message: 'Stage deleted successfully', deleteStage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}



module.exports = {
  postStage,
  getStages,
  getStageById,
  updateStage,
  deleteStage,
}
