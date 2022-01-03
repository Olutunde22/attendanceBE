import Class from '../services/class.js'

const createClass = async (req, res) => {
    const newClass = await Class.create({ ...req.body })
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

export default { createClass, getClasses }