const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: 
    {type:String,unique:true,required:true},
    price: {type:Number,required:true},
    Image: {type:Array,required:true},
    MOQ:{type:Number,required:true},
    P_cert:{type:String,required:true},
    S_cert:{type:String,required:true},
    isUsa:{type:Boolean},
    piece:{type:String,required:true},  
    ManufactureLocation:String,
    // Category: {type: String},
    link:{type:String,required:false},
    MainCategory_name:{type:String,required:true,ref:'MainCategory'},
    subcategory_name:{type:String,required:true,ref:'MainCategory'},
    sub_subcategory_name:{type:String,required:true,ref:'MainCategory'},



});

module.exports = mongoose.model('Product', productSchema);