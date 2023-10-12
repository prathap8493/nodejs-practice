const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
        username:{
            type:String,
            required:[true,"Please add the contact name"]
        },
        email:{
            type:String,
            required:[true,"Please add the email"],
            unique:[true,"Email Address already exsits"]            
        },
        password:{
            type:String,
            required:[true,"Please add the Phone number"]
        },
    },
    {
        timestamps:true,
    }
)
module.exports=mongoose.model("User",userSchema);