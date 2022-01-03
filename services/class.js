import Class from '../models/class.js'
import Lecturer from '../models/lecturer.js'

const create = async ({ className, createdBy }) => {
    try {
        const newClass = new Class({
            className, createdBy
        })
        await newClass.save()
    } catch (error) {
        return false
    }
}
//Create new class

const addStudentToClass = async ({ createdBy, }) => {

}
//Add student to class

const getClasses = async (id) => {
    try {
        const foundClasses = await Class.find({ createdBy: id }).populate()
        const hello = []
        foundClasses.forEach((foundClass) => {
            const newObj = {
                id: foundClass._id,
                className: foundClass.className,
                participants: foundClass.participants.length,
                createdAt: foundClass.createdAt
            }
            hello.push(newObj)
        })
        return hello
    }
    catch (error) {
        return false
    }
}
//View all classes by specific lecturer

export default {
    create,
    getClasses
}