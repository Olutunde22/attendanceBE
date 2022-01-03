import Student from '../models/student.js'
import { translateError } from './util.js'

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
        await student.save()
    } catch (error) {
        return false
    }
}

export default {
    addStudent
}