import Student from '../services/student.js'

const addStudent = async (req, res) => {

    const student = await Student.addStudent({ ...req.body })

    if (student === false) {
        res.status(400).json({ message: 'Error while adding student' })
    }

    return res.status(200).json({
        message: 'Student added successfully'
    })
}

export default { addStudent }