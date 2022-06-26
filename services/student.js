import Student from '../models/student.js';
import Class from '../models/class.js'

const addStudent = async ({ firstName, lastName, matricNumber, level, course, qrCode }) => {
	try {
		const student = new Student({
			firstName,
			lastName,
			matricNumber,
			level,
			course,
			qrCode,
		});
		await student.save();
		return true;
	} catch (error) {
		return false;
	}
};

const getStudents = async ({ matricNum }) => {
	try {
		return await Student.find({ matricNumber: { $regex: '.*' + matricNum + '.*' } })
	}
	catch (err) {

	}
}

const getStudent = async ({ studentId, lecturerId }) => {
	try {
		const student = await Student.findById(studentId)
		if (!student) return false
		let attendedClass = Class.aggregate({ $unwind: "$participants" },
			{ $match: { "participants.studentMatricNumber": `${student.matricNumber}` } },
			{ $project: { "participants.studentMatricNumber": 1 } })

		console.log(attendedClass)
		let totalClass = Class.find({ createdBy: lecturerId }).map((c) => c?.className)
	}
	catch (err) { }
}

export default {
	addStudent,
	getStudents,
	getStudent
};


