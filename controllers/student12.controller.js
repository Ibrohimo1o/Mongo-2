const { Student } = require('../models/model12.Student')

// Post
const postStudent = async (req, res) => {
	try {
		const { lid_id, firstName, lastName, phoneNumber, birthday, gender } =
			req.body
		const existingStudent = await Student.findOne({ lid_id })

		console.log(existingStudent)

		if (existingStudent) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan Student mavjud.',
			})
		} else {
			const newStudent = new Student({
				lid_id,
				firstName,
				lastName,
				phoneNumber,
				birthday,
				gender,
			})
			await newStudent.save()
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
const getStudents = async (req, res) => {
	try {
		const Students = await Student.find({}).populate('lid_id')
		res.json({
			success: true,
			message: 'Barcha StudentStatuslar royxati olingan.',
			innerData: Students,
		})
	} catch (error) {
		console.error('Error fetching StudentStatuslar:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: Student olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getStudentById = async (req, res) => {
	try {
		const StudentId = req.params.id

		const studentDate = await Student.findById(StudentId).populate('lid_id')
		if (!studentDate) {
			return res.status(404).json({ message: 'Student not found' })
		}

		res.json({ message: 'Student found', studentDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateStudent = async (req, res) => {
	try {
		const { id } = req.params
		const { lid_id, firstName, lastName, phoneNumber, birthday, gender } =
			req.body

		const updateStudent = await Student.findByIdAndUpdate(
			id,
			{
				lid_id,
				firstName,
				lastName,
				phoneNumber,
				birthday,
				gender,
			},
			{ new: true }
		)

		if (!updateStudent) {
			return res.status(404).json({
				success: false,
				message: 'Student not found!',
			})
		}
		res.json({
			success: true,
			message: 'Student updated successfully!',
			user: updateStudent,
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
const deleteStudent = async (req, res) => {
	try {
		const StudentId = req.params.id

		const deleteStudent = await Student.findByIdAndDelete(StudentId)

		if (!deleteStudent) {
			return res.status(404).json({ message: 'Student not found' })
		}
		res.json({ message: 'Student deleted successfully', deleteStudent })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

module.exports = {
	postStudent,
	getStudents,
	getStudentById,
	updateStudent,
	deleteStudent,
}
