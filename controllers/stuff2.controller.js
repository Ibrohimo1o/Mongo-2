const { Stuff } = require('../models/model2.Stuff')

// Post
const postStuff = async (req, res) => {
	try {
		const { firstName, lastName, phoneNumber, login, parol, isActive } =
			req.body
		const existingStuff = await Stuff.findOne({ firstName })

		console.log(existingStuff)

		if (existingStuff) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan Stuff mavjud.',
			})
		} else {
			const newStuff = new Stuff({
				firstName,
				lastName,
				phoneNumber,
				login,
				parol,
				isActive,
			})
			await newStuff.save()
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
const getStuffs = async (req, res) => {
	try {
		const stuffs = await Stuff.find({})
		res.json({
			success: true,
			message: 'Barcha Stufflar royxati olingan.',
			innerData: stuffs,
		})
	} catch (error) {
		console.error('Error fetching stuffs:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: stuff olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getStuffById = async (req, res) => {
	try {
		const stuffId = req.params.id

		const stuffDate = await Stuff.findById(stuffId)

		if (!stuffDate) {
			return res.status(404).json({ message: 'stuff not found' })
		}

		res.json({ message: 'stuff found', stuffDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateStuff = async (req, res) => {
	try {
		const { id } = req.params
		const { firstName, lastName, phoneNumber, login, parol, isActive } = req.body

		const updateStuff = await Stuff.findByIdAndUpdate(
			id,
			{ firstName, lastName, phoneNumber, login, parol, isActive },
			{ new: true }
		)

		if (!updateStuff) {
			return res.status(404).json({
				success: false,
				message: 'stuff not found!',
			})
		}
		res.json({
			success: true,
			message: 'stuff updated successfully!',
			user: updateStuff,
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
const deleteStuff = async (req, res) => {
	try {
		const stuffId = req.params.id

		const deleteStuff = await Stuff.findByIdAndDelete(stuffId)

		if (!deleteStuff) {
			return res.status(404).json({ message: 'stuff not found' })
		}
		res.json({ message: 'stuff deleted successfully', deleteStuff })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

module.exports = {
	postStuff,
	getStuffs,
	getStuffById,
	updateStuff,
	deleteStuff,
}
