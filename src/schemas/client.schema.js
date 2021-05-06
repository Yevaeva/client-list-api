const mongoose = require('mongoose')
const {Schema} = mongoose;

const ClientSchema = new Schema(
	{
        providers:   [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Provider' ,
        }],
        name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			sparse: true
		},
		password: {
			type: String
		},
		
		phone: {
			type: Number,
		},
	
	},
	
);

module.exports = mongoose.model('Client', ClientSchema);
