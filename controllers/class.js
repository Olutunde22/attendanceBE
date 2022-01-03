import Class from '../services/class.js'

const createClass = async (req, res) => {
    const newClass = await Class.create({ ...req.body })
    if (newClass === false) {
        return res.status(400).json({ message: 'Error Creating class' })
    }
}

const getClasses = async (req, res) => {
    return await Class.getClasses(req.params.id)
}

export default { createClass, getClasses }