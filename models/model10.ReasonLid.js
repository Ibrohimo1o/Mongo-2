const {Schema,model} = require('mongoose')

const reasonLidSchema = new Schema({
	reasonLid: {type: String, required: true}
})

const ReasonLid = model('reasonLid', reasonLidSchema)
module.exports = {ReasonLid}