const Jimp = require('jimp');

const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tmpDir, originalname } = req.file;

	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);

	const image = await Jimp.read(tmpDir);
	await image.resize(250, 250).writeAsync(tmpDir);
	await fs.rename(tmpDir, resultUpload);

	const avatarURL = path.join('avatars', filename);
	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({ avatarURL });
};

module.exports = updateAvatar;
