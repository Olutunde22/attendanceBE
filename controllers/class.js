import Class from '../services/class.js'

const createClass = async (req, res) => {
    const newClass = await Class.create(req.body)
    if (newClass === false) {
        return res.status(400).json({ message: 'Error Creating class' })
    } else {
        return res.status(200).json({ message: 'Success' })
    }
}

const getClasses = async (req, res) => {
    const classes = await Class.getClasses(req.params.id)
    if (classes === false) {
        return res.status(400).json({ message: 'Error getting class' })
    } else {
        return res.status(200).json(classes)
    }

}

const addStudentToClass = async (req, res) => {
    const add = await Class.addStudentToClass(req.body)
    if (add === false) {
        return res.status(400).json({ message: 'Error adding Student, please scan again' })
    } else if (add === true) {
        return res.status(200).json({ message: 'Student already in class' })
    } else {
        return res.status(200).json({ message: 'Success' })
    }
}

const getClassParticipants = async (req, res) => {
    const oneclass = await Class.getClassParticipants(req.params.id)
    if (oneclass === false) {
        return res.status(400).json({ message: 'Error getting Participants' })
    } else {
        return res.status(200).json(oneclass)
    }
}


export default { createClass, getClasses, addStudentToClass, getClassParticipants }
