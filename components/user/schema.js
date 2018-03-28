{
	name: {
		type: String,
		trim:true,
		required: true,
		minlength:3
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength:6,
		trim:true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		},
	},
	password: {
		type: String,
		required: true,
		minlength:6
	},
	tokens:[{
		access: {
			type:String,
			required: true
		},
		token: {
			type:String,
			required: true
		}
	}]
}
