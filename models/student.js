import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		matricNumber: {
			type: String,
			lowercase: true,
			required: [true, 'Matric number is required'],
			unique: true,
		},
		course: String,
		level: String,
		qrCode: {
			type: String,
			unique: true,
			required: [true, 'A qrCode is required for every student'],
		},
	},
	{ timestamps: true } //This stores the createdAt and updatedAt time of the model
);

const Student = new mongoose.model('Student', studentSchema);

export default Student;
