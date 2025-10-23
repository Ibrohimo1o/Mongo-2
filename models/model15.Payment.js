const { Schema, model } = require('mongoose')
const { Student } = require('./model12.Student')

const paymentSchema = new Schema({
	student_id: { type: Schema.Types.ObjectId, ref: Student },
	payment_last_date: { type: Date, required: true },
	payment_date: { type: Date, required: true },
	price: { type: Number, required: true },
	isPaid: { type: Boolean, required: true },
	totalAttent: { type: Number, required: true },
})

const Payment = model('payment', paymentSchema)
module.exports = { Payment }