const router = require('express').Router()
const verify = require('./verify')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')

router.post('/', verify, async (req, res) => {
    
    //check if teacher already exist in collection
    const findTeacher = await Teacher.findOne({ email: req.body.Data.email })
    if (!findTeacher) {
        const teacher = new Teacher({ ...req.body.Data })
        //create a new document and add to favourites
        try {
            const savedTeacher = await teacher.save()
            const student = await Student.findByIdAndUpdate(req.user._id, { $push: { "favouriteTeachers": savedTeacher._id } })
            res.json(student)
        } catch {
            res.status(400).send('Error')
        }
    } else {
        //add existing document to favourites
        try {
            const student = await Student.findByIdAndUpdate(req.user._id, { $addToSet: { "favouriteTeachers": findTeacher._id } })
            res.json(student)

        } catch {
            res.status(400).send('Error')
        }
    }


})

module.exports = router