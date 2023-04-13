const jwt=require('jsonwebtoken')

module.exports=async(req,res,next)=>{
    const authHeader=req.get('Authorization')
    if(!authHeader)
    {
        req.isAuth=false
        return next()
    }
    const token=req.get('Authorization').split(' ')[1]
    let decodedToken
    try {
         decodedToken=await jwt.verify(token,'secret')

    } catch (error) {
         req.isAuth=false
        return next()
    }

    if(!decodedToken)
    {
        req.isAuth=false
        return next()
    }
    req.userId=decodedToken.userId
    req.isAuth=true
    next()
}