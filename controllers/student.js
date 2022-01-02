import Student from '../services/student.js'

const addStudent = async (req, res) => {
    const student = await Student.addStudent({ ...req.body })
    console.log(student)
    if (student[0] === false) {
        return res.status(400).json({ message: 'Matric Number already Exists' })
    } else {
        return res.status(201).json({ message: 'Student added successfully' })
    }
}

export default { addStudent }