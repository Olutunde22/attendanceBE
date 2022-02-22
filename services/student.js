import Student from '../models/student.js'

const addStudent = async ({ firstName, lastName, matricNumber, level, course, barCode }) => {
    try {
        const student = new Student({
            firstName,
            lastName,
            matricNumber,
            level,
            course,
            barCode
        })
        await student.save()
    } catch (error) {
        return false
    }
}

export default {
    addStudent
}