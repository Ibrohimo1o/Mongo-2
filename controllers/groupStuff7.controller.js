const { GroupStuff } = require('../models/model7.GroupStuff')

// Post
const postGroupStuff = async (req, res) => {
	try {
		const { group_id, stuff_id } = req.body
		const existingGroupStuff = await GroupStuff.findOne({ group_id, stuff_id })

		console.log(existingGroupStuff)

		if (existingGroupStuff) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan GroupStuff mavjud.',
			})
		} else {
			const newGroupStuff = new GroupStuff({
				group_id,
				stuff_id,
			})
			await newGroupStuff.save()
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
const getGroupStuffs = async (req, res) => {
	try {
		const GroupStuffs = await GroupStuff.find({})
			.populate('group_id')
			.populate('stuff_id')
		res.json({
			success: true,
			message: 'Barcha GroupStufflar royxati olingan.',
			innerData: GroupStuffs,
		})
	} catch (error) {
		console.error('Error fetching GroupStuffs:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: GroupStuff olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getGroupStuffById = async (req, res) => {
	try {
		const GroupStuffId = req.params.id

		const GroupStuffDate = await GroupStuff.findById(GroupStuffId)
			.populate('group_id')
			.populate('stuff_id')

		if (!GroupStuffDate) {
			return res.status(404).json({ message: 'GroupStuff not found' })
		}

		res.json({ message: 'GroupStuff found', GroupStuffDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateGroupStuff = async (req, res) => {
	try {
		const { id } = req.params
		const { group_id, stuff_id } = req.body

		const updateGroupStuff = await GroupStuff.findByIdAndUpdate(
			id,
			{
				group_id,
				stuff_id,
			},
			{ new: true }
		)

		if (!updateGroupStuff) {
			return res.status(404).json({
				success: false,
				message: 'GroupStuff not found!',
			})
		}
		res.json({
			success: true,
			message: 'GroupStuff updated successfully!',
			user: updateGroupStuff,
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
const deleteGroupStuff = async (req, res) => {
	try {
		const GroupStuffId = req.params.id

		const deleteGroupStuff = await GroupStuff.findByIdAndDelete(GroupStuffId)

		if (!deleteGroupStuff) {
			return res.status(404).json({ message: 'GroupStuff not found' })
		}
		res.json({ message: 'GroupStuff deleted successfully', deleteGroupStuff })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

module.exports = {
	postGroupStuff,
	getGroupStuffs,
	getGroupStuffById,
	updateGroupStuff,
	deleteGroupStuff,
}
