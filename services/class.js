import Class from '../models/class.js'

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
    return await Class.find({ createdBy: id })
}
//View all classes by specific lecturer

export default {
    create,
    getClasses
}