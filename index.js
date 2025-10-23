const express = require('express')
const { connect } = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const { swaggerUi, swaggerSpec } = require('./swagger/swagger')

const app = express()

app.use(express.json())
app.use(cors())

// Connection
async function connecToDB() {
	try {
		await connect(process.env.MONGO_URL)
		console.log('To Mongo DB was connected!')
	}
	catch (error) {
		console.error('Connection to DB failed', error.message)
	}
}
connecToDB()


// SwaggerRoute
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// Route-1-Role1
const { role } = require('./routes/role1.route')
app.use('/roles', role)

// Route-2-Stuff2
const { stuff } = require('./routes/stuff2.route')
app.use('/stuffs', stuff)

// Route-3-StuffRole3
const { stuffRole } = require('./routes/stuffRole3.route')
app.use('/stuffRole', stuffRole)

// Route-4-Stage4
const { Stage } = require('./routes/stage4.route')
app.use('/Stages', Stage)

// Route-5-Branch5
const { Branch } = require('./routes/branch5.route')
app.use('/Branchs', Branch)

// Route-6-Group6
const { Group } = require('./routes/group6.route')
app.use('/Groups', Group)

// Route-7-GroupStuff7
const { GroupStuff } = require('./routes/groupStuff7.route')
app.use('/GroupStuffs', GroupStuff)

// Route-8-Lesson8
const { Lesson } = require('./routes/lesson8.route')
app.use('/Lessons', Lesson)

// Route-9-Lesson9
const { lidStatus } = require('./routes/lidStatus9.route')
app.use('/lidStatuss', lidStatus)

// Route-10-ReasonLid10
const { reasonLid } = require('./routes/reasonLid10.route')
app.use('/reasonLids', reasonLid)

// Route-11-Lid11
const { lidRouter } = require('./routes/lid11.route')
app.use('/lids', lidRouter)

// Route-12-Student12
const { student } = require('./routes/student12.route')
app.use('/students', student)

// Route-13-StudentsGroup13
const { studentsGroup } = require('./routes/studentsGroup13.route')
app.use('/studentsGroup', studentsGroup)

// Route-14-StudentLesson14
const { studentLesson } = require('./routes/studentLesson14.route')
app.use('/studentLesson', studentLesson)

// Route-15-Payment15
const { Payment } = require('./routes/payment15.route')
app.use('/Payment', Payment)

// Server
const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})

// Swagger-route
// app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

