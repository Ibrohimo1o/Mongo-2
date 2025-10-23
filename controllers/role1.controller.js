const { Role } = require('../models/model1.Role')

// Post
const postRole = async (req, res) => {
  try {
    const {
     name
    } = req.body
    const existingRole = await Role.findOne({ name })

    console.log(existingRole)

    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: 'Bu nom bilan royhatdan otgan foydanaluvchi mavjud.',
      })
    } else {
      
      const newRole = new Role({
       name
      })
      await newRole.save()
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
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({})
    res.json({
      success: true,
      message: 'Barcha rolellar royxati olingan.',
      innerData: roles,
    })
  } catch (error) {
    console.error('Error fetching roles:', error)
    res.status(500).json({
      success: false,
      message: 'Server xatosi: Role olishida xato yuz berdi.',
    })
  }
}

// GetUserById
const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id

    const roleDate = await Role.findById(roleId)

    if (!roleDate) {
      return res.status(404).json({ message: 'role not found' })
    }

    res.json({ message: 'role found', roleDate })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update
const updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const updateRole = await Role.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    )

    if (!updateRole) {
      return res.status(404).json({
        success: false,
        message: 'Role not found!',
      })
    }
    res.json({
      success: true,
      message: 'Role updated successfully!',
      user: updateRole,
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
const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id

    const deleteRole = await Role.findByIdAndDelete(roleId)

    if (!deleteRole) {
      return res.status(404).json({ message: 'Role not found' })
    }
    res.json({ message: 'Role deleted successfully', deleteRole })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}



module.exports = {
  postRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
}
