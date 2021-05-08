const mongoose = require('mongoose');
const {Schema} = mongoose;
const  beautify_unique = require('mongoose-beautiful-unique-validation');

const ClientSchema = new Schema(
	{
        providers:   [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Provider' ,
        }],
        name: {
			type: String,
			required:true
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			sparse: true,
			required:true,
		},
		
		phone: {
			type: Number,
			required:true
		},
	
	},
	
);
ClientSchema.plugin(beautify_unique,{
	defaultMessage: "Email duplication detected"
  });

module.exports = mongoose.model('Client', ClientSchema);
