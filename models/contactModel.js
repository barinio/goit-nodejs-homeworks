const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Set name for contact'],
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
});

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.required(),
	phone: Joi.number().integer().required(),
	favorite: Joi.boolean(),
});

const updStutusSchema = Joi.object({
	favorite: Joi.boolean().required(),
}).messages({
	'any.required': 'missing field favorite',
});

const schemas = { addSchema, updStutusSchema };

const Contact = model('contacts', contactSchema);

module.exports = { Contact, schemas };
