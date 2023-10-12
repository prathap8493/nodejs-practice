const {constants}=require('../constants')
const errorHandler=(err,req,res,next)=>{
    console.log(res.statusCode)
    const statusCode=res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed",message:err.message,stackTrace:err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;
        case constants.SERVER_ERROR:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;
        default:
            console.log("No errors all good")
            break;
    }
}

module.exports=errorHandler;