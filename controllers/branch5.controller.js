const { Branch } = require('../models/model5.Branch')

// Post
const postBranch = async (req, res) => {
	try {
		const { name, address, callNumber } = req.body
		const existingBranch = await Branch.findOne({ address })

		console.log(existingBranch)

		if (existingBranch) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan branch mavjud.',
			})
		} else {
			const newBranch = new Branch({
				name,
				address,
				callNumber,
			})
			await newBranch.save()
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
const getBranchs = async (req, res) => {
	try {
		const Branchs = await Branch.find({})
		res.json({
			success: true,
			message: 'Barcha Branchllar royxati olingan.',
			innerData: Branchs,
		})
	} catch (error) {
		console.error('Error fetching Branchs:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: Branch olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getBranchById = async (req, res) => {
	try {
		const BranchId = req.params.id

		const branchData = await Branch.findById(BranchId)

		if (!branchData) {
			return res.status(404).json({ message: 'Branch not found' })
		}

		res.json({ message: 'Branch found', branchData })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updateBranch = async (req, res) => {
	try {
		const { id } = req.params
		const { name, address, callNumber } = req.body

		const updateBranch = await Branch.findByIdAndUpdate(
			id,
			{ name, address, callNumber },
			{ new: true }
		)

		if (!updateBranch) {
			return res.status(404).json({
				success: false,
				message: 'Branch not found!',
			})
		}
		res.json({
			success: true,
			message: 'Branch updated successfully!',
			user: updateBranch,
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
const deleteBranch = async (req, res) => {
	try {
		const BranchId = req.params.id

		const deleteBranch = await Branch.findByIdAndDelete(BranchId)

		if (!deleteBranch) {
			return res.status(404).json({ message: 'Branch not found' })
		}
		res.json({ message: 'Branch deleted successfully', deleteBranch })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

module.exports = {
	postBranch,
	getBranchs,
	getBranchById,
	updateBranch,
	deleteBranch,
}
