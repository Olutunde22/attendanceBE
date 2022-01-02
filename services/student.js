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
        await student.save((err) => {
            if (!err) {
                return true
            }
        })
    } catch (error) {
        return [false, translateError(error)]
    }
}

export default {
    addStudent
}