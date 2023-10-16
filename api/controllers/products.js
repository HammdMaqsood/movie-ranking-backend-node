const mongoose = require("mongoose");
const Product = require("../models/product");
// const Category =require("../models/Category");
const mainCategory=require("../models/MainCategory");

// exports.products_get_all = (req, res, next) => {
//     let condition = {};
//     for (const key in req.query) {
//         if (req.query.hasOwnProperty(key)) {
//             condition[key] = req.query[key];
//         }
//     }

//     Product.find(condition)
//         .select("name price _id Image MainCat piece MOQ P_cert S_cert isUsa ManufactureLocation Category")
//         .exec()
//         .then(docs => {
//             const response = {
//                 count: docs.length,
//                 products: docs.map(doc => {
//                     return {
//                         name: doc.name,
//                         price: doc.price,      
//                         Image: doc.Image,
//                         MOQ:doc.MOQ,
//                         P_cert:doc.P_cert,
//                         S_cert:doc.S_cert,
//                         isUsa:doc.isUsa,
//                         ManufactureLocation:doc.ManufactureLocation,
//                         Category:doc.Category,
//                         piece:doc.piece,
//                         MainCat:doc.MainCat,
//                         slug:"http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
//                         request: {
//                             type: "GET",
//                             url: "http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
//                         }
//                     };
//                 })
//             };

//             res.status(200).json(response);

//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

//start code
// exports.products_get_all = (req, res, next) => {
//     let condition = {};
//     for (const key in req.query) {
//         if (req.query.hasOwnProperty(key)) {
//             condition[key] = req.query[key];
//         }
//     }

//     Product.find(condition)
//         .select("name price _id Image MainCat piece MOQ P_cert S_cert isUsa ManufactureLocation Category")
//         .exec()
//         .then(docs => {
//             const response = {
//                 count: docs.length,
//                 products: docs.map(doc => {
//                     return {
//                         name: doc.name,
//                                                 price: doc.price,      
//                                                 Image: doc.Image,
//                                                 MOQ:doc.MOQ,
//                                                 P_cert:doc.P_cert,
//                                                 S_cert:doc.S_cert,
//                                                 isUsa:doc.isUsa,
//                                                 ManufactureLocation:doc.ManufactureLocation,
//                                                 MainCategory_name:doc.MainCategory_name,
//                                                 subcategory_name:doc.subcategory_name,
//                                                 sub_subcategory_name:doc.sub_subcategory_name,
                                                
//                                                 piece:doc.piece,
//                         slug:"http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
//                         request: {
//                             type: "GET",
//                             url: "http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
//                         }
//                     };
//                 })
//             };

//             res.status(200).json(response);

//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };










exports.products_get_all = (req, res, next) => {
    let condition = {};
    for (const key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            condition[key] = req.query[key];
        }
    }

    let query = {};

// Building query string dynamically based on filter values
// if (this.name) {
//     query.name = this.name;
// }
// if (this.priceStart) {
//     query.priceStart = this.priceStart;
// }
// if (this.priceEnd) {
//     query.priceEnd = this.priceEnd;
// }
// if (this.MOQ) {
//     query.MOQ = this.MOQ;
// }
// if (this.sort) {
//     query.sort = this.sort;
// }
// if (this.pcert) {
//     query.P_cert = this.pcert.join(",");
// }

// let queryString = "";
// for (const [key, value] of Object.entries(query)) {
//     queryString += `${key}=${value}&`;
// }

// // Making the API call
// fetch(`http://localhost:5000/products/?${queryString}`)
//   .then((response) => response.json())
//   .then((data) => {
//     this.products = data;
//   });

    






    if (req.query.priceStart || req.query.priceEnd) {
        condition.price = {};
        if (req.query.priceStart) {
            condition.price.$gte = parseInt(req.query.priceStart);
        }
        if (req.query.priceEnd) {
            condition.price.$lte = parseInt(req.query.priceEnd);
        }
    }
    if(req.query.MOQ)
    {
        condition.MOQ={};
        condition.MOQ.$lte = parseInt(req.query.MOQ);

    }
    let sort = {};
    if (req.query.sort === 'hl') {
        sort = { price: -1 };
    } else if (req.query.sort === 'lh') {
        sort = { price: 1 };
    }
    else if (req.query.sort === 'MOQ') {
        sort = { MOQ: -1 };
    }
    else if (req.query.sort=== 'default')
    {
        sort ={};
    }
    if (req.query.name) {
        condition.name = { $regex: new RegExp(req.query.name, "i") };
    }

  
  

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    Product.find(condition)
        .select("name price _id Image MainCat piece MOQ P_cert S_cert isUsa ManufactureLocation Category")
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,      
                        Image: doc.Image,
                        MOQ:doc.MOQ,
                        P_cert:doc.P_cert,
                        S_cert:doc.S_cert,
                        isUsa:doc.isUsa,
                        ManufactureLocation:doc.ManufactureLocation,
                        MainCategory_name:doc.MainCategory_name,
                        subcategory_name:doc.subcategory_name,
                        sub_subcategory_name:doc.sub_subcategory_name,
                        
                        piece:doc.piece,
                       
                        slug:"http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
                        }
                    };
                })
            };

            res.status(200).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


// In this code, you can specify the desired page and number of results per page using the page and limit query parameters, respectively. For example, http://localhost:5000/products/?MainCat=Electronics&page=2&limit=5 would return the second page of results with 5 products per page, filtered by the MainCat attribute with the value of Electronics.







// exports.products_get_all = (req, res, next) => {
//     let condition = {};
//     for (const key in req.query) {
//         if (req.query.hasOwnProperty(key) && key !== 'page' && key !== 'limit') {
//             condition[key] = new RegExp(req.query[key], "i");
//         }
//     }

//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit) : 10;
//     const skip = (page - 1) * limit;

//     Product.find(condition)
//         .select("name price _id Image MainCat piece MOQ P_cert S_cert isUsa ManufactureLocation Category")
//         .skip(skip)
//         .limit(limit)
//         .exec()
//         .then(docs => {
//             const response = {
//                 count: docs.length,
//                 products: docs.map(doc => {
//                     return {
//                         name: doc.name,
//                         price: doc.price,      
//                         Image: doc.Image,
//                         MOQ:doc.MOQ,
//                         P_cert:doc.P_cert,
//                         S_cert:doc.S_cert,
//                         isUsa:doc.isUsa,
//                         ManufactureLocation:doc.ManufactureLocation,
//                         Category:doc.Category,
//                         piece:doc.piece,
//                         MainCat:doc.MainCat,
//                         slug:"http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
//                         request: {
//                             type: "GET",
//                             url: "http://localhost:5000/products/" + doc.name.replace(/\s+/g, '-'),
//                         }
//                     };
//                 })
//             };

//             res.status(200).json(response);

//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

// In this code, the search query is converted to a case-insensitive regular expression using the RegExp function in JavaScript. This allows for a more flexible search that can handle uppercase, lowercase, and spaces in the query.


// exports.products_get_all = (req, res, next) => {
//     let condition = {};
//     for (const key in req.query) {
//         if (req.query.hasOwnProperty(key) && key !== 'page' && key !== 'limit') {
//             condition[key] = req.query[key].replace(/\+/g, ' ');
//         }
//     }

//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit) : 10;
//     const skip = (page - 1) * limit;

//     Product.find(condition)
//         .select("name price _id Image MainCat piece MOQ P_cert S_cert isUsa ManufactureLocation Category")
//         .skip(skip)
//         .limit(limit)
//         .exec()
//         .then(docs => {
//             const response = {
//                 count: docs.length,
//                 products: docs.map(doc => {
//                     return {
//                         name: doc.name,
//                         price: doc.price,      
//                         Image: doc.Image,
//                         MOQ:doc.MOQ,
//                         P_cert:doc.P_cert,
//                         S_cert:doc.S_cert,
//                         isUsa:doc.isUsa,
//                         ManufactureLocation:doc.ManufactureLocation,
//                         Category:doc.Category,
//                         piece:doc.piece,
//                         MainCat:doc.MainCat,
//                         slug:"http://localhost:5000/products/" + encodeURIComponent(doc.name.replace(/\s+/g, '-')),
//                         request: {
//                             type: "GET",
//                             url: "http://localhost:5000/products/" + encodeURIComponent(doc.name.replace(/\s+/g, '-')),
//                         }
//                     };
//                 })
//             };

//             res.status(200).json(response);

//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };





exports.products_create_product = (req, res, next) => {

   
    mainCategory.findOne({
        "MainCategory_name": req.body.MainCategory_name,
        "subcategories.subcategory_name": req.body.subcategory_name,
        "subcategories.sub_subcategories.sub_subcategory_name": req.body.sub_subcategory_name
      })
    .then(category => {
      if (!category) {
        return res.status(404).json({
          message: "Category not found"
        });     
      }
       const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,      
        Image: req.body.Image,
        MOQ:req.body.MOQ,
        P_cert:req.body.P_cert,
        S_cert:req.body.S_cert,
        isUsa:req.body.isUsa,
        ManufactureLocation:req.body.ManufactureLocation,
        piece:req.body.piece,
        MainCategory_name:req.body.MainCategory_name,
        subcategory_name:req.body.subcategory_name,
        sub_subcategory_name:req.body.sub_subcategory_name,
     


    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    MOQ:result.MOQ,
                    P_cert:result.p_cert,
                    S_cert:result.M_cert,
                    isUsa:result.isUsa,
                    ManufactureLocation:result.ManufactureLocation,
                    MainCategory_name:result.MainCategory_name,
        subcategory_name:result.subcategory_name,
        sub_subcategory_name:result.sub_subcategory_name,
                    piece:result.piece,
                    Image:result.Image,
                    slug:'ok',
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/" + result.name.replace(/\s+/g, '-')
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
      })
      
};

exports.products_get_product = (req, res, next) => {
    
    var name = req.params.productname;
    console.log("name abefore",name);
    name=name.replace(/-/g, ' ');
    console.log("name after",name);
    Product.findOne({name:name})
         .select("name price _id Image piece  MainCat MOQ P_cert S_cert  isUsa ManufactureLocation  Category ")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products"
                    }
                });
            } else {
                    res
                        .status(404)
                        .json({ message: "No valid entry found for provided Category" });
                }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

// exports.products_update_product = (req, res, next) => {
//     const id = req.params.productId;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.update({ _id: id }, { $set: updateOps })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Product updated",
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:5000/products/" + id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

// exports.products_delete = (req, res, next) => {
//     const id = req.params.productId;
//     Product.remove({ _id: id })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Product deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:5000/products",
//                     body: { name: "String", price: "Number" }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };