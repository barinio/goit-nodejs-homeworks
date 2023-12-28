const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateSubscription = async (req, res) => {
	const { subscription } = req.body;
	const { _id } = req.user;

	if (!['starter', 'pro', 'business'].includes(subscription)) {
		throw HttpError(400, 'Invalid subscription type');
	}

	const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

	if (!user) {
		throw HttpError(404, 'User not found');
	}

	res.json({ email: user.email, subscription });
};

module.exports = updateSubscription;
