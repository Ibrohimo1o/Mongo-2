const { Payment } = require('../models/model15.Payment')

// Post
const postPayment = async (req, res) => {
	try {
		const {
			student_id,
			payment_last_date,
			payment_date,
			price,
			isPaid,
			totalAttent,
		} = req.body
		const existingPayment = await Payment.findOne({ student_id })

		console.log(existingPayment)

		if (existingPayment) {
			return res.status(400).json({
				success: false,
				message: 'Bu nom bilan royhatdan otgan Payment mavjud.',
			})
		} else {

			const newPayment = new Payment({
				student_id,
				payment_last_date,
				payment_date,
				price,
				isPaid,
				totalAttent,
			})
			await newPayment.save()
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
const getPayments = async (req, res) => {
	try {
		const Payments = await Payment.find({}).populate('student_id')
		res.json({
			success: true,
			message: 'Barcha Paymentlar royxati olingan.',
			innerData: Payments,
		})
	} catch (error) {
		console.error('Error fetching PaymentStatuslar:', error)
		res.status(500).json({
			success: false,
			message: 'Server xatosi: Payment olishida xato yuz berdi.',
		})
	}
}

// GetUserById
const getPaymentById = async (req, res) => {
	try {
		const PaymentId = req.params.id

		const paymentDate = await Payment.findById(PaymentId).populate('student_id')
		if (!paymentDate) {
			return res.status(404).json({ message: 'Payment not found' })
		}

		res.json({ message: 'Payment found', paymentDate })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

// Update
const updatePayment = async (req, res) => {
	try {
		const { id } = req.params
		const {
			student_id,
			payment_last_date,
			payment_date,
			price,
			isPaid,
			totalAttent,
		} = req.body

		const updatePayment = await Payment.findByIdAndUpdate(
			id,
			{
				student_id,
				payment_last_date,
				payment_date,
				price,
				isPaid,
				totalAttent,
			},
			{ new: true }
		)

		if (!updatePayment) {
			return res.status(404).json({
				success: false,
				message: 'Payment not found!',
			})
		}
		res.json({
			success: true,
			message: 'Payment updated successfully!',
			user: updatePayment,
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
const deletePayment = async (req, res) => {
	try {
		const PaymentId = req.params.id

		const deletePayment = await Payment.findByIdAndDelete(PaymentId)

		if (!deletePayment) {
			return res.status(404).json({ message: 'Payment not found' })
		}
		res.json({ message: 'Payment deleted successfully', deletePayment })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}



module.exports = {
	postPayment,
	getPayments,
	getPaymentById,
	updatePayment,
	deletePayment,
}
