const { LidStatus } = require('../models/model9.LidStatus')

// Post
const postLidStatus = async (req, res) => {
	try {
		const {
			status
		} = req.body
		const existingLidStatus = await LidStatus.findOne({ status })

		console.log(existingLidStatus)

		if (existingLidStatus) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan LidStatus mavjud.',
			})
		} else {

			const newLidStatus = new LidStatus({
				status
			})
			await newLidStatus.save()
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
const getLidStatuss = async (req, res) => {
	try {
		const LidStatuss = await LidStatus.find({})
		res.json({
			success: true,
			message: 'Barcha LidStatuslar royxati olingan.',
			innerData: LidStatuss,
		})
	} catch (error) {
		console.error('Error fetching LidStatuss:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: LidStatus olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getLidStatusById = async (req, res) => {
	try {
		const LidStatusId = req.params.id

		const lidStatusDate = await LidStatus.findById(LidStatusId)
		if (!lidStatusDate) {
			return res.status(404).json({ message: 'LidStatus not found' })
		}

		res.json({ message: 'LidStatus found', lidStatusDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateLidStatus = async (req, res) => {
	try {
		const { id } = req.params
		const { LidStatusTheme,
			status
		} = req.body

		const updateLidStatus = await LidStatus.findByIdAndUpdate(
			id,
			{
			status
			},
			{ new: true }
		)

		if (!updateLidStatus) {
			return res.status(404).json({
				success: false,
				message: 'LidStatus not found!',
			})
		}
		res.json({
			success: true,
			message: 'LidStatus updated successfully!',
			user: updateLidStatus,
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
const deleteLidStatus = async (req, res) => {
	try {
		const LidStatusId = req.params.id

		const deleteLidStatus = await LidStatus.findByIdAndDelete(LidStatusId)

		if (!deleteLidStatus) {
			return res.status(404).json({ message: 'LidStatus not found' })
		}
		res.json({ message: 'LidStatus deleted successfully', deleteLidStatus })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postLidStatus,
	getLidStatuss,
	getLidStatusById,
	updateLidStatus,
	deleteLidStatus,
}
