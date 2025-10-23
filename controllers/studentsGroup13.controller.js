const { StudentsGroup } = require('../models/model13.StudentsGroup')

// Post
const postStudentsGroup = async (req, res) => {
	try {
		const {
			student_id,
			group_id
		} = req.body
		const existingStudentsGroup = await StudentsGroup.findOne({ student_id })

		console.log(existingStudentsGroup)

		if (existingStudentsGroup) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan StudentsGroup mavjud.',
			})
		} else {

			const newStudentsGroup = new StudentsGroup({
				student_id,
				group_id
			})
			await newStudentsGroup.save()
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
const getStudentsGroups = async (req, res) => {
	try {
		const StudentsGroups = await StudentsGroup.find({}).populate('student_id').populate('group_id')
		res.json({
			success: true,
			message: 'Barcha StudentsGroupStatuslar royxati olingan.',
			innerData: StudentsGroups,
		})
	} catch (error) {
		console.error('Error fetching StudentsGroupStatuslar:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: StudentsGroup olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getStudentsGroupById = async (req, res) => {
	try {
		const StudentsGroupId = req.params.id

		const studentsGroupDate = await StudentsGroup.findById(StudentsGroupId).populate('student_id').populate('group_id')
		if (!studentsGroupDate) {
			return res.status(404).json({ message: 'StudentsGroup not found' })
		}

		res.json({ message: 'StudentsGroup found', studentsGroupDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateStudentsGroup = async (req, res) => {
	try {
		const { id } = req.params
		const {
			student_id,
			group_id
		} = req.body

		const updateStudentsGroup = await StudentsGroup.findByIdAndUpdate(
			id,
			{
				student_id,
				group_id
			},
			{ new: true }
		)

		if (!updateStudentsGroup) {
			return res.status(404).json({
				success: false,
				message: 'StudentsGroup not found!',
			})
		}
		res.json({
			success: true,
			message: 'StudentsGroup updated successfully!',
			user: updateStudentsGroup,
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
const deleteStudentsGroup = async (req, res) => {
	try {
		const StudentsGroupId = req.params.id

		const deleteStudentsGroup = await StudentsGroup.findByIdAndDelete(StudentsGroupId)

		if (!deleteStudentsGroup) {
			return res.status(404).json({ message: 'StudentsGroup not found' })
		}
		res.json({ message: 'StudentsGroup deleted successfully', deleteStudentsGroup })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postStudentsGroup,
	getStudentsGroups,
	getStudentsGroupById,
	updateStudentsGroup,
	deleteStudentsGroup,
}
