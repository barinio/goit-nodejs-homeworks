const { Contact } = require('../../models');

const addContact = async (req, res) => {
	const { _id: owner } = req.user;

	const addNewContact = await Contact.create({ ...req.body, owner });
	res.status(201).json(addNewContact);
};

module.exports = addContact;
