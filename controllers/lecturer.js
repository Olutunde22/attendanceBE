import Lecturer from '../services/lecturer.js'

const signup = async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    const lecturer = await Lecturer.create({
        firstName,
        lastName,
        email,
        password
    })

    if (lecturer[0] === false) {
        res.status(400).json({ message: 'Email already Exists' })
    }


    else {
        return res.status(200).send({
            id: lecturer[1]._id,
            firstName: lecturer[1].firstName,
            lastName: lecturer[1].lastName,
            email: lecturer[1].email
        })
    }

}

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const lecturer = await Lecturer.login({
        email,
        password
    })

    if (lecturer[0] === false) {
        res.status(400).json({ message: "Invalid email / password" })
    } else {
        return res.status(200).send({
            id: lecturer[1]._id,
            firstName: lecturer[1].firstName,
            lastName: lecturer[1].lastName,
            email: lecturer[1].email
        })
    }
}


export default { signup, login }