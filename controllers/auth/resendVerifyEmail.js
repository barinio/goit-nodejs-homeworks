const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models');

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(400, 'missing required field email');
	}
	if (user.verify) {
		throw HttpError(400, 'Verification has already been passed');
	}
	const verifyEmail = {
		to: email,
		fubject: 'Verification email',
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
	};
	await sendEmail(verifyEmail);

	res.json({ message: 'Verification email sent' });
};

module.exports = resendVerifyEmail;
