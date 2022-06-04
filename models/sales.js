let mongoose = require('mongoose');



// Employee Schema
const Sales = mongoose.model('Sales', {
    categoryname: {
        type: String,
        required:true
    }, 
    currentsales: {
        type: Number,
        required:true
    },
    totalsales: {
        type:Number,
        required:true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    
    },
    level: {
        type:Number,
        required:true
    },
    progress: {
        type:Number,
        required:false
    },
    barcolor: {
        type:String,
        required:false
    },
    progresslabel: {
        type:String,
        required:false
    }
    
});


// db.scores.aggregate( [
//     {
//       $addFields: {
//         totalHomework: { $sum: "$homework" } ,
//         totalQuiz: { $sum: "$quiz" }
//       }
//     },
//     {
//       $addFields: { totalScore:
//         { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
//     }
//  ] )
module.exports = {Sales}