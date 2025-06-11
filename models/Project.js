const mongoose = require("mongoose");

const ProjectSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        maxLength:25
    },
    summary:{
        type:String,
        required:[true,'Please provide summary'],
        maxLength:75
    },
    description:{
        type:String,
        required:[true,'Please provide description'],
        maxLength: 150
    },
    category:{
        type:String,
        enum:{
            values:['AI/ML','IoT','Others'],
            message:'{VALUE} is not a valid category'
        },
        required:[true,'Please provide category']
    },
    members:{
        type:[String],
        validate:[
            {
                validator:function(members){
                    return members.length === 5;
                },
                message: 'Team size must be 5'
            },
            {
                validator:function(members){
                    return members.every((member)=>member.length>0&&member.length<=25);
                },
                message: 'Member name cannot be empty or exceed 25 characters'
            }
        ]  

    },
    status:{
        type:String,
        enum:{
            values:['accepted','pending','declined'],
            message:'{VALUE} is not a valid status'
        },
        default:'pending'
    },
    createdBy:{
        type: mongoose.ObjectId,
        ref:'Institute',
        required:[true,'Please provide institute']
    },
    remarks:{
        type:String,
        maxLength:100 
    }

},{timestamps:true})

module.exports=mongoose.model('Project',ProjectSchema)