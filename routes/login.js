const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student')



router.post('/', async (req, res) => {
    //checking if user exist
    try {
        const user = await Student.findOne({ "email": req.body.Data.email })
        if (!user) return res.status(404).send('User does not exist')

        //verifying password
        const authenticated = await bcrypt.compare(req.body.Data.password, user.password)

        if (authenticated) {
            //signing a jwt 
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            res.header('auth-token', token).send(token)
        }
        else {
            res.status(400).send('password or email does not match')
        }
    }
    catch {
        res.status(500).send('Error')
    }
})


module.exports = router