import mongoose from 'mongoose';

const lecturerSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: {
			type: String,
			lowercase: true,
			required: [true, 'Email is required'],
			unique: true,
			match: [/\S+@\S+\.\S+/, 'Email is invalid'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			min: [6, 'Password is too short'],
		},
		department: {
			type: String,
			required: [true, 'Department is required'],
		},
		token: {
			type: String,
			required: [true, 'Token is required'],
			unique: true,
		},
		disabled: {
			type: Boolean,
			required: true,
      enum: ['true', 'false'],
      default: false
		},
		salt: String,
	},
	{ timestamps: true } //This stores the createdAt and updatedAt time of the model
);

const Lecturer = new mongoose.model('Lecturer', lecturerSchema);

export default Lecturer;
