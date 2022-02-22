import Lecturer from '../services/lecturer.js';

const signup = async (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;
	const department = req.body.department;

	const lecturer = await Lecturer.create({
		firstName,
		lastName,
		email,
		password,
		department,
	});

	if (lecturer[0] === false) {
		res.status(400).json({ message: lecturer[1] });
	} else {
		return res.status(200).send({
			id: lecturer[1]._id,
			firstName: lecturer[1].firstName,
			lastName: lecturer[1].lastName,
			email: lecturer[1].email,
			department: lecturer[1].department,
		});
	}
};

const login = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const lecturer = await Lecturer.login({
		email,
		password,
	});

	if (lecturer === 'disabled') {
		return res.status(401).json({ message: 'Sorry your account is disabled' });
	}

	if (lecturer === false) {
		return res.status(400).json({ message: 'Invalid email / password' });
	} else {
		return res.status(200).send({
			id: lecturer._id,
			firstName: lecturer.firstName,
			lastName: lecturer.lastName,
			email: lecturer.email,
		});
	}
};

const forgotPassword = async (req, res) => {
	const email = req.body.email;

	const lecturer = await Lecturer.forgotPassword({ email });

	if (lecturer[0] === false) {
		if ('errno' in lecturer[1]) {
			res.status(400).json({ message: 'Error while trying to send a mail' });
		} else {
			res.status(400).json({ message: 'Email not found' });
		}
	} else {
		return res.status(200).send({ message: lecturer[1] });
	}
};

const changePassword = async (req, res) => {
	const token = req.params.token;
	const password = req.body.password;

	const lecturer = await Lecturer.changePassword({ token, password });
	if (lecturer[0] === false) {
		return res.status(400).json({ message: lecturer[1] });
	} else {
		return res.status(200).send({ message: lecturer[1] });
	}
};

export default { signup, login, forgotPassword, changePassword };
