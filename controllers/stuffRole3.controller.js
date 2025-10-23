const { StuffRole } = require('../models/model3.StuffRole')

// Post
const postStuffRole = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body

		const existingStuffRole = await StuffRole.findOne({stuff_id, role_id })
		if (existingStuffRole) {
			return res.status(400).json({message: "Bu StuffRole mavjud"})
		}

    const newStuffRole = new StuffRole({
      stuff_id,
      role_id
    })

    await newStuffRole.save()

    return res.status(201).json({
      success: true,
      message: 'Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi.',
    })
  } catch (error) {
    console.error('Xato:', error)
    return res.status(500).json({
      success: false,
      message: 'Server xatosi: Ro‘yxatdan o‘tish jarayonida xato yuz berdi.',
    })
  }
}


// Get
const getStuffRoles = async (req, res) => {
  try {
    const StuffRoles = await StuffRole.find({}).populate("stuff_id").populate("role_id")
    res.json({
      success: true,
      message: 'Barcha StuffRolelar royxati olingan.',
      innerData: StuffRoles,
    })
  } catch (error) {
    console.error('Error fetching StuffRoles:', error)
    res.status(500).json({
      success: false,
      message: 'Server xatosi: Role olishida xato yuz berdi.',
    })
  }
}

// GetUserById
const getStuffRoleById = async (req, res) => {
  try {
    const stuffRoleId = req.params.id

    const stuffRoleDate = await StuffRole.findById(stuffRoleId).populate("stuff_id role_id")
		

    if (!stuffRoleDate) {
      return res.status(404).json({ message: 'stuffRole not found' })
    }

    res.json({ message: 'stuffRole found', stuffRoleDate })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update
const updateStuffRole = async (req, res) => {
  try {
    const { id } = req.params
    const { stuff_id,
			role_id
			} = req.body

    const updateStuffRole = await StuffRole.findByIdAndUpdate(
      id,
      { stuff_id,
				role_id },
      { new: true }
    )

    if (!updateStuffRole) {
      return res.status(404).json({
        success: false,
        message: 'Role not found!',
      })
    }
    res.json({
      success: true,
      message: 'Role updated successfully!',
      user: updateStuffRole,
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
const deleteStuffRole = async (req, res) => {
  try {
    const stuffRoleId = req.params.id

    const deleteStuffRole = await StuffRole.findByIdAndDelete(stuffRoleId)

    if (!deleteStuffRole) {
      return res.status(404).json({ message: 'Role not found' })
    }
    res.json({ message: 'stuffRole deleted successfully', deleteStuffRole })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}



module.exports = {
  postStuffRole,
  getStuffRoles,
  getStuffRoleById,
  updateStuffRole,
  deleteStuffRole,
}
