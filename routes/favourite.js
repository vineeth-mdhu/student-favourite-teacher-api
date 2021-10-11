const router = require('express').Router()
const verify = require('./verify')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')

router.get('/', verify, async (req, res) => {

    //querying for most favourite teacher 
    try {
        const mostFavouriteTeacher = await Student.aggregate([{ $unwind: "$favouriteTeachers" },
        { $sortByCount: "$favouriteTeachers" }])

        const result = [await Teacher.findById(mostFavouriteTeacher[0]._id)]
        // handing same number of counts
        for (var i = 1; i < mostFavouriteTeacher.length; i++) {
            if (mostFavouriteTeacher[i].count == mostFavouriteTeacher[0].count) {
                result.push(await Teacher.findById(mostFavouriteTeacher[i]._id))
            }
            else {
                break
            }
        }
        res.json(result)
    } catch {

        res.status(500).send('Error')
    }

})

module.exports = router