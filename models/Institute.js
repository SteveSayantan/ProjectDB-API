const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcryptjs')

const InstituteSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please provide the name of Institute'],
        maxLength:[60, 'Name can not be more than 60 characters'],
        minLength: [10, 'Name can not be less than 10 characters'],
        trim:true,
        unique:true,
        lowercase:true
    },
    email:{
        type: String,
        required:[true, 'Please provide the email'],
        unique:true,
        validate:{
           validator: isEmail,
           message: '{VALUE} is not a valid email'
        },
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6
    },

    role:{
        type: String,
        enum:['admin','contributor'],
        default:'contributor'
    }

})

InstituteSchema.pre('save', async function (){
    if (!this.isModified('password')) return;

    const salt= await bcrypt.genSalt();     // defaults to 10
    this.password= await bcrypt.hash(this.password, salt);
})

module.exports=mongoose.model('Institute',InstituteSchema);