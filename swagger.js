const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'My API',
		description: 'Contacts API',
	},
	host: 'localhost:8080',
	schemes: ['http'],
	definitions: {
		Contact: {
			$firstName: 'John',
			$lastName: 'Doe',
			$email: 'john.doe@example.com',
			favoriteColor: 'blue',
			birthday: '12/25/90',
		},
		ContactArray: [{$ref: '#/definitions/Contact'}],
	},
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
