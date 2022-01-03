import express from 'express'
import lecturer from '../controllers/lecturer.js'
import student from '../controllers/student.js'
import newClass from '../controllers/class.js'

const router = express.Router()

router.get('/api/getclasses/:id', newClass.getClasses)

router.post('/api/signup', lecturer.signup)

router.post('/api/login', lecturer.login)

router.post('/api/addStudent', student.addStudent)

router.post('/api/createclass', newClass.createClass)

export default router