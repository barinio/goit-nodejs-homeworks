const { Contact } = require('../../models');

const listContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite } = req.query;
	const skip = (page - 1) * limit;

	const filter = { owner };

	if (favorite !== undefined) {
		filter.favorite = favorite === 'true';
	}

	const contacts = await Contact.find(filter, '-createdAt -updatedAt', { skip, limit });
	res.json(contacts);
};

module.exports = listContacts;
