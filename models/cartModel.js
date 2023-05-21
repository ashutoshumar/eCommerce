const mongoose = require("mongoose");

const cartSchema =new  mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      products:[ {
      product:{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
  name: {
    type: String,
    required:true
    
  },

  price: {
    type: Number,
    required: true,
  
  },
 
  image: 
    {
     
        type: String,
        required: true,
      
    },


  Stock: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  }


}]
 
 
});

module.exports = mongoose.model("Cart", cartSchema);