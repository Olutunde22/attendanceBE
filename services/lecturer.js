import Lecturer from '../models/lecturer.js'
import bcrypt from 'bcrypt'
const saltRounds = 10
import { translateError } from './util.js'

const create = async ({ firstName, lastName, email, password }) => {
    try {
        const lecturer = new Lecturer({
            firstName,
            lastName,
            email,
            password
        })        
        const hashed = await hashPassword(password)
        lecturer.salt = hashed.salt
        lecturer.password = hashed.password
        await lecturer.save()
        return [true, lecturer]
    } catch (error) {
        return [false, translateError(error)]
    }
}

const login = async ({ email, password }) => {
    try {
        const foundLecturer = await Lecturer.findOne({ email: email })

        const result = await verifyPassword(password, foundLecturer.password)
        if (result) {
            return [result, foundLecturer]
        } else {
            return [false]
        }
    } catch (error) {
        return [false]
    }
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    password = await bcrypt.hash(password, salt)
    return { salt, password }
}

const verifyPassword = async (lecturerPassword, hashedPassword) => {
    return await bcrypt.compare(lecturerPassword, hashedPassword)
}

export default {
    create,
    login
}