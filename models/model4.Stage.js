const {Schema,model} = require('mongoose')

const stageSchema = new Schema({
	name: {type: String, required: true}
})

const Stage = model('stage', stageSchema)
module.exports = {Stage}