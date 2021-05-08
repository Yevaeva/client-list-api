
const mongoose = require('mongoose');
const {Schema} = mongoose;
const  beautify_unique = require('mongoose-beautiful-unique-validation');

const ProviderSchema = new Schema(
	{
        name: {
			type: String,
			unique: true,
			required:true
		},
	},
	
);

ProviderSchema.plugin(beautify_unique,{ 
	defaultMessage: "Provider name duplication detected"
  });

module.exports = mongoose.model('Provider', ProviderSchema);
