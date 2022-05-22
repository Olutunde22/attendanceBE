import Student from '../models/student.js'

const addStudent = async ({ firstName, lastName, matricNumber, level, course, qrCode }) => {
    try {
        const student = new Student({
            firstName,
            lastName,
            matricNumber,
            level,
            course,
            qrCode
        })
        console.log(student)
        await student.save()
    } catch (error) {
        return false
    }
}

export default {
    addStudent
}