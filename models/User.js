const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			minLength: 2,
			maxLength: 20,
			required: true,
		},
		email: {
			type: String,
			maxLength: 255,
			required: true,
		},
		password: {
			type: String,
			minLength: 8,
			required: true,
		},
		profile_image: {
			data: Buffer,
			type: String,
		},
		name: {
			type: String,
			maxLength: 50,
		},
		description: {
			type: String,
			maxLength: 255,
		},
		location: {
			type: String,
			maxLength: 255,
		},
		url: {
			type: String,
			maxLength: 255,
		},
		birthdate: {
			type: Date,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
