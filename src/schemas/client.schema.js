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
			required:true
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			sparse: true,
			required:true
		},
		
		phone: {
			type: Number,
			required:true
		},
	
	},
	
);

module.exports = mongoose.model('Client', ClientSchema);
