const router = require('express').Router()
const verify = require('./verify')
const Student = require('../models/Student')

router.delete('/:id',verify, async (req,res)=>{
    //removeing by id
    try{
    const updatedStudent=await Student.updateOne({_id:req.user._id},{$pull:{"favouriteTeachers":req.params.id}},{returnNewDocument: true})
    res.json(updatedStudent)
    }
    catch{
        res.status(400).send('Error')
    }
})
 
module.exports=router