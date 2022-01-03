import Student from '../services/student.js'

const addStudent = async (req, res) => {
    const student = await Student.addStudent({ ...req.body })
    if (student[0] === false) {
        return res.status(400).json({ message: 'Matric Number already Exists' })
    }
}

export default { addStudent }