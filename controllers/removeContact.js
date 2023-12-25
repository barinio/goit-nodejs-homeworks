const { Contact } = require('../models');
const { HttpError } = require('../helpers');

const removeContact = async (req, res) => {
	const { id } = req.params;
	const removeContact = await Contact.findByIdAndDelete(id);
	if (!removeContact) {
		throw HttpError(404, 'Not found');
	}
	res.json({ message: 'contact deleted' });
};

module.exports = removeContact;
