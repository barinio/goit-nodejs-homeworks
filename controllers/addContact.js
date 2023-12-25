const { Contact } = require('../models');

const addContact = async (req, res) => {
	const addNewContact = await Contact.create(req.body);
	res.status(201).json(addNewContact);
};

module.exports = addContact;
