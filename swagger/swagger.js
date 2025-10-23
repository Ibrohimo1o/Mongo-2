const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: "Foydalanuvchi API",
			version: '1.0.0',
			description: 'Foydalanuvchi bilan ishlovchi CRUD API',
		},
		servers: [
			{
				url: 'http://localhost:8888',
			},
		],
	},
	apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

module.exports = {swaggerUi,swaggerSpec}