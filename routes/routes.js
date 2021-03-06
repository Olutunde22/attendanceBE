import express from 'express'
import lecturer from '../controllers/lecturer.js'
import student from '../controllers/student.js'
import newClass from '../controllers/class.js'

const router = express.Router()

router.get('/api/getclasses/:id', newClass.getClasses)

router.get('/api/students', student.getStudents)

router.get('/api/student/:studentId/lecturer/:lecturerId', student.getStudent)

router.get('/api/getclassparticipants/:id', newClass.getClassParticipants)

router.post('/api/signup', lecturer.signup)

router.post('/api/login', lecturer.login)

router.post('/api/addStudent', student.addStudent)

router.post('/api/addtoclass', newClass.addStudentToClass)

router.post('/api/createclass', newClass.createClass)

router.post('/api/forgot', lecturer.forgotPassword)

router.post('/api/reset/:token', lecturer.changePassword)

export default router
