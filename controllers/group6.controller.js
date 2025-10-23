const { Group } = require('../models/model6.Group')

// Post
const postGroup = async (req, res) => {
	try {
		const {
			groupName,
			lessonStartTime,
			lessonContinues,
			lessonWeekDay,
			groupStage_id,
			roomNumber,
			roomFloor,
			branch_id,
			lessonsQuant,
			isActive,
		} = req.body
		const existingGroup = await Group.findOne({ groupName })

		console.log(existingGroup)

		if (existingGroup) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan Group mavjud.',
			})
		} else {

			const newGroup = new Group({
				groupName,
				lessonStartTime,
				lessonContinues,
				lessonWeekDay,
				groupStage_id,
				roomNumber,
				roomFloor,
				branch_id,
				lessonsQuant,
				isActive,
			})
			await newGroup.save()
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
const getGroups = async (req, res) => {
	try {
		const Groups = await Group.find({}).populate('branch_id').populate('groupStage_id')
		res.json({
			success: true,
			message: 'Barcha Grouplar royxati olingan.',
			innerData: Groups,
		})
	} catch (error) {
		console.error('Error fetching Groups:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: Group olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getGroupById = async (req, res) => {
	try {
		const GroupId = req.params.id

		const GroupDate = await Group.findById(GroupId).populate('branch_id').populate('groupStage_id')

		if (!GroupDate) {
			return res.status(404).json({ message: 'Group not found' })
		}

		res.json({ message: 'Group found', GroupDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateGroup = async (req, res) => {
	try {
		const { id } = req.params
		const { groupName,
			lessonStartTime,
			lessonContinues,
			lessonWeekDay,
			groupStage_id,
			roomNumber,
			roomFloor,
			branch_id,
			lessonsQuant,
			isActive, } = req.body

		const updateGroup = await Group.findByIdAndUpdate(
			id,
			{
				groupName,
				lessonStartTime,
				lessonContinues,
				lessonWeekDay,
				groupStage_id,
				roomNumber,
				roomFloor,
				branch_id,
				lessonsQuant,
				isActive,
			},
			{ new: true }
		)

		if (!updateGroup) {
			return res.status(404).json({
				success: false,
				message: 'Group not found!',
			})
		}
		res.json({
			success: true,
			message: 'Group updated successfully!',
			user: updateGroup,
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
const deleteGroup = async (req, res) => {
	try {
		const GroupId = req.params.id

		const deleteGroup = await Group.findByIdAndDelete(GroupId)

		if (!deleteGroup) {
			return res.status(404).json({ message: 'Group not found' })
		}
		res.json({ message: 'Group deleted successfully', deleteGroup })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postGroup,
	getGroups,
	getGroupById,
	updateGroup,
	deleteGroup,
}
