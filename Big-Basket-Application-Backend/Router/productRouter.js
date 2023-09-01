const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');         // representing the table 

// getting all the products  ---- USING ASYNC AWAIT 

router.get('/products', async (request, response) => {
    try {
        let products = await Product.find();
        response.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            error: error.message
        });
    }
});

// getting a single product 

router.get('/products/:id', async (request, response) => {
    let productID = request.params.id;
    try {
        let products = await Product.findById(productID);
        response.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            error: error.message
        });
    }
});

// Creating a new product 

router.post('/products', async (request, response) => {
    let newProduct = {
        name: request.body.name,
        image: request.body.image,
        price: request.body.price,
        qty: request.body.qty,
        info: request.body.info
    };
    try {
        // if product already exists 
        let product = await Product.findOne({ name: newProduct.name });
        if (product) {
            return response.status(401).json({
                msg: 'Product Already Exists'
            });
        }

        //else saving to database 
        product = new Product(newProduct);
        product = await product.save();
        response.status(200).json({
            result: 'Product successfully created',
            product: product
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            error: error.message
        });
    }

});

// Updating the existing product 

router.put('/products/:id', async(request, response) => {
    let updatedProductID = request.params.id;
    let UpdatedProduct = {
        name: request.body.name,
        image: request.body.image,
        price: request.body.price,
        qty: request.body.qty,
        info: request.body.info
    };
    try {
        let product = await Product.findById(updatedProductID); 
        if(!product){
            return response.status(401).json({
                msg : 'Product Not Exists'
            }); 
        }
        // Updating to database 
        product = await Product.findByIdAndUpdate(updatedProductID, {
            $set : UpdatedProduct
        }, {new : true}); 
        response.status(200 ).json({
            msg : 'Product is successfully Updated', 
            product : product
        }); 
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            error: error.message
        });
    }
});

// Deleting the existing product 

router.delete('/products/:id', async(request, response) => {
    let productID = request.params.id;
     try{
        let product = await Product.findById(productID);  
        if(!product){
            return response.status(401).json({
                msg : 'Product not exists'
            }); 
        }
        // Deleting the database 
        product = await Product.findByIdAndDelete(productID); 
        response.status(200).json({
            msg : 'Product is successfully deleted', 
            prodcuct : product
        }); 
     }
     catch (error) {
        console.log(error);
        response.status(500).json({
            error: error.message
        });
    }
});

module.exports = router; 