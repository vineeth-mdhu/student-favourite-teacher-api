//used as middleware

const jwt = require('jsonwebtoken')

module.exports= function auth(req,res,next){
    //get the token
    const token=req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    //verifying the token
    try{
        const verified= jwt.verify(token,process.env.SECRET)
        req.user=verified
        next()
    }catch{
        res.status(400).send('Invalid Token')
    }
}
