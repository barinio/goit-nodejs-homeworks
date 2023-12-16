const { Contact } = require('../models/contactModel');

const { ctrlWrapper, HttpError } = require('../helpers');

const listContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

const getContactById = async (req, res) => {
	const { id } = req.params;
	const contactById = await Contact.findOne({ _id: id });
	if (!contactById) {
		throw HttpError(404, 'Not found');
	}
	res.json(contactById);
};

const removeContact = async (req, res) => {
	const { id } = req.params;
	const removeContact = await Contact.findByIdAndDelete(id);
	if (!removeContact) {
		throw HttpError(404, 'Not found');
	}
	res.json({ message: 'contact deleted' });
};

const addContact = async (req, res) => {
	const addNewContact = await Contact.create(req.body);
	res.status(201).json(addNewContact);
};

const updateContact = async (req, res) => {
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedContact) {
		throw HttpError(404, 'Not found');
	}
	res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedContact) {
		throw HttpError(404, 'Not found');
	}
	res.json(updatedContact);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	removeContact: ctrlWrapper(removeContact),
	addContact: ctrlWrapper(addContact),
	updateContact: ctrlWrapper(updateContact),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
