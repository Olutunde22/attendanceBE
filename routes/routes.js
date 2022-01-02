import express from 'express'
import lecturer from '../controllers/lecturer.js'
import student from '../controllers/student.js'

const router = express.Router()

router.post('/api/signup', lecturer.signup)

router.post('/api/login', lecturer.login)

router.post('/api/addStudent', student.addStudent)

export default router