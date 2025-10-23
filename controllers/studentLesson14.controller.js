const { StudentLesson } = require('../models/model14.StudentLesson')

// Post
const postStudentLesson = async (req, res) => {
	try {
		const {
			lesson_id,
			student_id,
			isThere,
			reason,
			bePaid,
		} = req.body
		const existingStudentLesson = await StudentLesson.findOne({ lesson_id, student_id })

		console.log(existingStudentLesson)

		if (existingStudentLesson) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan StudentLesson mavjud.',
			})
		} else {

			const newStudentLesson = new StudentLesson({
				lesson_id,
				student_id,
				isThere,
				reason,
				bePaid,
			})
			await newStudentLesson.save()
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
const getStudentLessons = async (req, res) => {
	try {
		const StudentLessons = await StudentLesson.find({}).populate('student_id').populate('lesson_id')
		res.json({
			success: true,
			message: 'Barcha StudentLessonStatuslar royxati olingan.',
			innerData: StudentLessons,
		})
	} catch (error) {
		console.error('Error fetching StudentLessonStatuslar:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: StudentLesson olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getStudentLessonById = async (req, res) => {
	try {
		const StudentLessonId = req.params.id

		const studentLessonDate = await StudentLesson.findById(StudentLessonId).populate('student_id').populate('lesson_id')
		if (!studentLessonDate) {
			return res.status(404).json({ message: 'StudentLesson not found' })
		}

		res.json({ message: 'StudentLesson found', studentLessonDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateStudentLesson = async (req, res) => {
	try {
		const { id } = req.params
		const {
			lesson_id,
			student_id,
			isThere,
			reason,
			bePaid,
		} = req.body

		const updateStudentLesson = await StudentLesson.findByIdAndUpdate(
			id,
			{
				lesson_id,
				student_id,
				isThere,
				reason,
				bePaid,
			},
			{ new: true }
		)

		if (!updateStudentLesson) {
			return res.status(404).json({
				success: false,
				message: 'StudentLesson not found!',
			})
		}
		res.json({
			success: true,
			message: 'StudentLesson updated successfully!',
			user: updateStudentLesson,
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
const deleteStudentLesson = async (req, res) => {
	try {
		const StudentLessonId = req.params.id

		const deleteStudentLesson = await StudentLesson.findByIdAndDelete(StudentLessonId)

		if (!deleteStudentLesson) {
			return res.status(404).json({ message: 'StudentLesson not found' })
		}
		res.json({ message: 'StudentLesson deleted successfully', deleteStudentLesson })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postStudentLesson,
	getStudentLessons,
	getStudentLessonById,
	updateStudentLesson,
	deleteStudentLesson,
}
