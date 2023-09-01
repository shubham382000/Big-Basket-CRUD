const mongoose = require('mongoose'); 
const schema = new mongoose.Schema({
    name : {
        type : String, 
        require : true, 
        unique : true
    },
    image : {
        type : String, 
        require : true
    }, 
    price : {
        type : Number, 
        require : true
    }, 
    qty : {
        type : Number,
        require : true
    }, 
    info : {
        type : String, 
        require : true
    }, 
    created : {
        type : Date, 
        default : Date.now()
    }
}); 

// table name 

let Product = mongoose.model('product', schema);              // table representation 
module.exports = Product; 