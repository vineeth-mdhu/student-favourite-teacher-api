const router = require('express').Router()
const bcrypt = require('bcrypt')
const Student= require('../models/Student')

router.post('/', async (req, res) => {
    //hash password
    const hashedPassword = await bcrypt.hash(req.body.Data.password, 10)

    //create object 
    const student = new Student({ ...req.body.Data })

    student.password = hashedPassword

    //saving document
    try{
        const savedUser= await student.save()
        res.send(savedUser)
    }catch{
        res.status(500).send('Error')
    }
})

module.exports=router