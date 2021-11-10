const errormiddleware = (err,req,res,next)=>{
    console.log('reached')
    const statusCode = res.statuscode === 200 ? 500 : statusCode
    res.status(statusCode)
    res.json({
        message:err.message
    })
}

module.exports = {errormiddleware}