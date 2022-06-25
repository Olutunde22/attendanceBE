import Student from '../services/student.js'

const addStudent = async (req, res) => {
    const student = await Student.addStudent(req.body)

    if (student === false) {
        return res.status(400).json({ message: 'Matric Number already Exists' })
    } else {
        return res.status(200).json({ message: 'Success' })
    }
}

const getStudents = async (req, res) => {
    const students = await Student.getStudents(req.query)

    return res.status(200).json(students)
}

const getStudent = async (req, res) => {
    const student = await Student.getStudent(req.params)
    if (student === false) {
        return res.status(400).json({ message: 'No student found' })
    } else {
        return res.status(200).json(student)
    }
}

export default { addStudent, getStudents, getStudent }