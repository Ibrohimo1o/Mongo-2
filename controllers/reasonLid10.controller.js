const { ReasonLid } = require('../models/model10.ReasonLid')

// Post
const postReasonLid = async (req, res) => {
	try {
		const {
			reasonLid
		} = req.body
		const existingReasonLid = await ReasonLid.findOne({ reasonLid })

		console.log(existingReasonLid)

		if (existingReasonLid) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan ReasonLid mavjud.',
			})
		} else {

			const newReasonLid = new ReasonLid({
				reasonLid
			})
			await newReasonLid.save()
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
const getReasonLids = async (req, res) => {
	try {
		const ReasonLids = await ReasonLid.find({})
		res.json({
			success: true,
			message: 'Barcha ReasonLidlar royxati olingan.',
			innerData: ReasonLids,
		})
	} catch (error) {
		console.error('Error fetching ReasonLids:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: ReasonLid olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getReasonLidById = async (req, res) => {
	try {
		const ReasonLidId = req.params.id

		const reasonLidDate = await ReasonLid.findById(ReasonLidId)

		if (!reasonLidDate) {
			return res.status(404).json({ message: 'ReasonLid not found' })
		}

		res.json({ message: 'ReasonLid found', reasonLidDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateReasonLid = async (req, res) => {
	try {
		const { id } = req.params
		const { ReasonLidTheme,
			reasonLid
		} = req.body

		const updateReasonLid = await ReasonLid.findByIdAndUpdate(
			id,
			{
				reasonLid
			},
			{ new: true }
		)

		if (!updateReasonLid) {
			return res.status(404).json({
				success: false,
				message: 'ReasonLid not found!',
			})
		}
		res.json({
			success: true,
			message: 'ReasonLid updated successfully!',
			user: updateReasonLid,
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
const deleteReasonLid = async (req, res) => {
	try {
		const ReasonLidId = req.params.id

		const deleteReasonLid = await ReasonLid.findByIdAndDelete(ReasonLidId)

		if (!deleteReasonLid) {
			return res.status(404).json({ message: 'ReasonLid not found' })
		}
		res.json({ message: 'ReasonLid deleted successfully', deleteReasonLid })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postReasonLid,
	getReasonLids,
	getReasonLidById,
	updateReasonLid,
	deleteReasonLid,
}
