Category.findOne({name:req.body.Category})
    .then(product => {
      if (!product) {
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
        P_cert:req.body.p_cert,
        S_cert:req.body.M_cert,
        isUsa:req.body.isUsa,
        ManufactureLocation:req.body.ManufactureLocation,
        Category:req.body.Category,
        piece:req.body.piece,
     


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
                    Category:result.Category,
                    piece:result.piece,
                    Image:result.Image,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/" + result.name
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
      