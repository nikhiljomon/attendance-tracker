const mongoose= require("mongoose");

const attendenceSchema = mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "student"
    },
    attendenceDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:['Present','Absent'],
        required:[true,'Please mark status Present or Absent'],
    },
},
{
    timestamps:true,
}
);

attendenceSchema.index({studentId:1,attendenceDate: 1},{unique:true});

const Attendence= mongoose.model("Attendence",attendenceSchema);

module.exports = Attendence;