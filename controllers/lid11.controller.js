const { Lid } = require('../models/model11.Lid')

// Post
const postLid = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			phoneNumber,
			lidStage_id,
			testDate,
			trialLessonDate,
			trialLessonTime,
			trialLessonGroup_id,
			lidStatus_id,
			cancelReason_idstatus,
		} = req.body
		const existingLid = await Lid.findOne({ firstName })

		console.log(existingLid)

		if (existingLid) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan Lid mavjud.',
			})
		} else {

			const newLid = new Lid({
				firstName,
				lastName,
				phoneNumber,
				lidStage_id,
				testDate,
				trialLessonDate,
				trialLessonTime,
				trialLessonGroup_id,
				lidStatus_id,
				cancelReason_idstatus,
			})
			await newLid.save()
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
const getLids = async (req, res) => {
	try {
		const Lids = await Lid.find({})
		.populate('lidStage_id')
		.populate('trialLessonGroup_id')
		.populate('lidStatus_id')
		.populate('cancelReason_id')
		res.json({
			success: true,
			message: 'Barcha LidStatuslar royxati olingan.',
			innerData: Lids,
		})
	} catch (error) {
		console.error('Error fetching LidStatuslar:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: Lid olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getLidById = async (req, res) => {
	try {
		const LidId = req.params.id

		const lidDate = await Lid.findById(LidId)
		.populate('lidStage_id')
		.populate('trialLessonGroup_id')
		.populate('lidStatus_id')
		.populate('cancelReason_id')

		if (!lidDate) {
			return res.status(404).json({ message: 'Lid not found' })
		}

		res.json({ message: 'Lid found', lidDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateLid = async (req, res) => {
	try {
		const { id } = req.params
		const { 
			firstName,
				lastName,
				phoneNumber,
				lidStage_id,
				testDate,
				trialLessonDate,
				trialLessonTime,
				trialLessonGroup_id,
				lidStatus_id,
				cancelReason_idstatus,
		} = req.body

		const updateLid = await Lid.findByIdAndUpdate(
			id,
			{
				firstName,
				lastName,
				phoneNumber,
				lidStage_id,
				testDate,
				trialLessonDate,
				trialLessonTime,
				trialLessonGroup_id,
				lidStatus_id,
				cancelReason_idstatus,
			},
			{ new: true }
		)

		if (!updateLid) {
			return res.status(404).json({
				success: false,
				message: 'Lid not found!',
			})
		}
		res.json({
			success: true,
			message: 'Lid updated successfully!',
			user: updateLid,
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
const deleteLid = async (req, res) => {
	try {
		const LidId = req.params.id

		const deleteLid = await Lid.findByIdAndDelete(LidId)

		if (!deleteLid) {
			return res.status(404).json({ message: 'Lid not found' })
		}
		res.json({ message: 'Lid deleted successfully', deleteLid })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postLid,
	getLids,
	getLidById,
	updateLid,
	deleteLid,
}
