const { Lesson } = require('../models/model8.Lesson')

// Post
const postLesson = async (req, res) => {
	try {
		const {
			lessonTheme,
			lessonNumber,
			group_id,
			lessonDate,
		} = req.body
		const existingLesson = await Lesson.findOne({ lessonTheme })

		console.log(existingLesson)

		if (existingLesson) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan Lesson mavjud.',
			})
		} else {

			const newLesson = new Lesson({
				lessonTheme,
				lessonNumber,
				group_id,
				lessonDate,
			})
			await newLesson.save()
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
const getLessons = async (req, res) => {
	try {
		const Lessons = await Lesson.find({}).populate('group_id')
		res.json({
			success: true,
			message: 'Barcha Lessonlar royxati olingan.',
			innerData: Lessons,
		})
	} catch (error) {
		console.error('Error fetching Lessons:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: Lesson olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getLessonById = async (req, res) => {
	try {
		const LessonId = req.params.id

		const lessonDate = await Lesson.findById(LessonId).populate('group_id')

		if (!lessonDate) {
			return res.status(404).jlessonDateson({ message: 'Lesson not found' })
		}

		res.json({ message: 'Lesson found', lessonDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateLesson = async (req, res) => {
	try {
		const { id } = req.params
		const { lessonTheme,
			lessonNumber,
			group_id,
			lessonDate,
		} = req.body

		const updateLesson = await Lesson.findByIdAndUpdate(
			id,
			{
				lessonTheme,
				lessonNumber,
				group_id,
				lessonDate,
			},
			{ new: true }
		)

		if (!updateLesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found!',
			})
		}
		res.json({
			success: true,
			message: 'Lesson updated successfully!',
			user: updateLesson,
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
const deleteLesson = async (req, res) => {
	try {
		const LessonId = req.params.id

		const deleteLesson = await Lesson.findByIdAndDelete(LessonId)

		if (!deleteLesson) {
			return res.status(404).json({ message: 'Lesson not found' })
		}
		res.json({ message: 'Lesson deleted successfully', deleteLesson })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postLesson,
	getLessons,
	getLessonById,
	updateLesson,
	deleteLesson,
}
