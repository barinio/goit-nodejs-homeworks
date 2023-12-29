const handleMongooseError = (err, data, next) => {
	const { name, code } = err;
	console.log('name, code :', name, code);

	const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

	err.status = status;
	next();
};

module.exports = handleMongooseError;
