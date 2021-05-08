const mongoose = require('mongoose');
const { Schema } = mongoose;
const beautify_unique = require('mongoose-beautiful-unique-validation');


const ClientSchema = new Schema(
	{
		providers: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Provider',
		}],
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			required: true,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
		},

		phone: {
			type: Number,
			required: true
		},

	},

);
ClientSchema.plugin(beautify_unique, {
	defaultMessage: "Email duplication detected"
});

module.exports = mongoose.model('Client', ClientSchema);
