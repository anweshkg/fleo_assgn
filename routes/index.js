const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;    

const { Sales } = require('../models/sales');



// fetch all data
router.get('/api/sales', (req, res) => {
    Sales.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});




// fetch data of nth level

router.get('/api/sales/:level', (req, res) => {
    Sales.findById(req.params.level, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});



// Save each data
router.post('/api/sales/add', (req, res) => {
    const sale = new Sales({
        categoryname: req.body.categoryname,
        currentsales: req.body.currentsales,
        totalsales: req.body.totalsales,
        level: req.body.level
    });
    sale.collection.aggregate([
        { $addFields:
            {
                progresspercent:
                    { $function:
                        {
                            body: function(currentsales,totalsales){
                                var result = 0;
                                s1= parseInt(currentsales);
                                s2= parseInt(totalsales);
                                if (s2!=0){
                                    result=((s1/s2)*100);
                                }
                                return result;
                            },
                            args: [ "$currentsales","$totalsales" ],
                            lang: "js"
                        }
                    },
                barcolor:
                    { $function:
                        {
                            body: function(progresspercent){
                                
                                s1= parseInt(progresspercent);
                                if (s1<33){
                                    return "red";
                                }else if(s1>=33 && s1<66){
                                    return "yellow";
                                }else return "green";
                                
                            },
                            args: [ "$progresspercent" ],
                            lang: "js"
                        }
                    },
                progresslabel:
                    { $function:
                        {
                            body: function(progresspercent){
                                
                                s1= parseInt(progresspercent);
                                if (s1<33){
                                    return "At Risk";
                                }else if(s1>=33 && s1<66){
                                    return "“off track";
                                }else return "“on track";
                                
                            },
                            args: [ "$progresspercent" ],
                            lang: "js"
                        }
                    }

            }
        }
    ])
    sale.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Category Added Successfully', addSales: data})
        } else {
           console.log(err);
        }
    });
});



// Update data

router.put('/api/sales/update/:id', (req, res) => {


    const sale = {
        categoryname: req.body.categoryname,
        currentsales: req.body.currentsales,
        totalsales: req.body.totalsales,
        level: req.body.level
    };
    sale.collection.aggregate([
        { $addFields:
            {
                progresspercent:
                    { $function:
                        {
                            body: function(currentsales,totalsales){
                                var result = 0;
                                s1= parseInt(currentsales);
                                s2= parseInt(totalsales);
                                if (s2!=0){
                                    result=(s1/s2*100);
                                }
                                return result;
                            },
                            args: [ "$currentsales","$totalsales" ],
                            lang: "js"
                        }
                    },
                barcolor:
                    { $function:
                        {
                            body: function(progress){
                                
                                s1= parseInt(progress);
                                if (s1<33){
                                    return "red";
                                }else if(s1>=33 && s1<66){
                                    return "yellow";
                                }else return "green";
                                
                            },
                            args: [ "$progress" ],
                            lang: "js"
                        }
                    },
                progresslabel:
                    { $function:
                        {
                            body: function(progress){
                                
                                s1= parseInt(progress);
                                if (s1<33){
                                    return "At Risk";
                                }else if(s1>=33 && s1<66){
                                    return "“off track";
                                }else return "“on track";
                                
                            },
                            args: [ "$progress" ],
                            lang: "js"
                        }
                    }

            }
        }
    ])
    Sales.findByIdAndUpdate(req.params.id, { $set: sale }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Data Updated Successfully', updateSales: data})
        } else {
            console.log(err);
        }
    });
});





// Delete category
router.delete('/api/sales/:categoryId', (req, res) => {

    Sales.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Category deleted', deleteCategory: data})
        } else {
            console.log(err);
        }
    });
});

// Delete category with level
// router.delete('/api/sales/:id', (req, res) => {

//     Sales.findByIdAndRemove(req.params.id, (err, data) => {
//         if(!err) {
//             // res.send(data);
//             res.status(200).json({code: 200, message: 'Category deleted', delete: data})
//         } else {
//             console.log(err);
//         }
//     });
// });


module.exports = router;