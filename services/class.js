import Class from '../models/class.js';
import Student from '../models/student.js';
import moment from 'moment';

const create = async ({ className, createdBy }) => {
	try {
		const newClass = new Class({
			className,
			createdBy,
		});
		await newClass.save();
	} catch (error) {
		return false;
	}
};
//Create new class

const addStudentToClass = async ({ studentId, classId }) => {
	try {
		const student = await Student.findOne({ matricNumber: studentId });
		const participantInfo = {
			studentName: student.firstName + ' ' + student.lastName,
			studentMatricNumber: student.matricNumber,
			studentCourse: student.course,
			studentLevel: student.level,
			time: moment(),
		};
		const foundClass = await Class.findById(classId);
		const found = foundClass.participants.find((stu) => stu.studentMatricNumber === studentId);
		if (!found) {
			foundClass.participants.push(participantInfo);
			await foundClass.save();
		} else {
			return true;
		}
	} catch (error) {
		return false;
	}
};
//Add student to class

const getClasses = async (id) => {
	try {
		const foundClasses = await Class.find({ createdBy: id });
		const hello = [];
		foundClasses.forEach((foundClass) => {
			const newObj = {
				id: foundClass._id,
				className: foundClass.className,
				participants: foundClass.participants.length,
				createdAt: foundClass.createdAt,
			};
			hello.push(newObj);
		});
		return hello;
	} catch (error) {
		return false;
	}
};

const getClassParticipants = async (id) => {
	try {
		return Class.findById(id);
	} catch (error) {
		return false;
	}
};
export default {
	create,
	getClasses,
	addStudentToClass,
	getClassParticipants,
};
