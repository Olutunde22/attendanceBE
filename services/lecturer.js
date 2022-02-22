import Lecturer from '../models/lecturer.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { translateError } from './util.js';
import { v4 as uuidv4 } from 'uuid';
import { createTransport } from 'nodemailer';

const create = async ({ firstName, lastName, email, password, department }) => {
	try {
		const lecturer = new Lecturer({
			firstName,
			lastName,
			email,
			password,
			department,
		});
		const hashed = await hashPassword(password);
		lecturer.salt = hashed.salt;
		lecturer.password = hashed.password;
		lecturer.token = uuidv4();
		await lecturer.save();
		return [true, lecturer];
	} catch (error) {
		return [false, translateError(error)];
	}
};

const login = async ({ email, password }) => {
	try {
		const foundLecturer = await Lecturer.findOne({ email: email });
		if (foundLecturer.disabled) {
			return 'disabled';
		}
		const result = await verifyPassword(password, foundLecturer.password);
		if (result) {
			return foundLecturer;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(saltRounds);
	password = await bcrypt.hash(password, salt);
	return { salt, password };
};

const verifyPassword = (lecturerPassword, hashedPassword) => {
	return bcrypt.compare(lecturerPassword, hashedPassword);
};

const forgotPassword = async ({ email }) => {
	try {
		const foundLecturer = await Lecturer.findOne({ email: email });
		foundLecturer.disabled = true;
		const transporter = createTransport({
			service: 'gmail',
			auth: {
				user: process.env.NODE_USER,
				pass: process.env.NODE_PASSWORD,
			},
		});
		let message = {
			from: 'IT department <no-reply@school.com>',
			to: email,
			subject: 'Forgot Password',
			text: `Please click on this link to change your password https://attendance-rho.vercel.app/changepassword/${foundLecturer.token}`,
		};
		await transporter.sendMail(message);
		foundLecturer.save();
		return [true, 'Please check your email to continue the process'];
	} catch (err) {
		return [false, err];
	}
};

const changePassword = async ({ token, password }) => {
	try {
		const foundLecturer = await Lecturer.findOne({ token: token });
		const hashed = await hashPassword(password);
		foundLecturer.salt = hashed.salt;
		foundLecturer.password = hashed.password;
		foundLecturer.token = uuidv4();
		foundLecturer.disabled = false;
		await foundLecturer.save();
		return [true, 'Password changed'];
	} catch (err) {
		return [false, 'token does not exist, please request for a new token'];
	}
};

export default {
	create,
	login,
	forgotPassword,
	changePassword,
};
