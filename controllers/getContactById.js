const { Contact } = require('../models');
const { HttpError } = require('../helpers');

const getContactById = async (req, res) => {
	const { id } = req.params;
	const contactById = await Contact.findOne({ _id: id });
	if (!contactById) {
		throw HttpError(404, 'Not found');
	}
	res.json(contactById);
};

module.exports = getContactById;
