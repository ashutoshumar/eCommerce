const Cart = require("../models/cartModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addCart = catchAsyncErrors(async (req, res, next) => {
    const { products } = req.body;
    console.log(req.body)
    // const product = {
    //   user: ,
    //   name: req.user.name,
    //   rating: Number(rating),
    //   comment,
    // };
  
    let cart = await Cart.findOne({user:req.user._id});
    if(cart)
    {
      const inCart = cart.products.find(
        (p) => p.product.toString() === req.body.products.product.toString()
      );
      if(inCart)
      {
        cart.products.forEach((p) => {
          if(p.product.toString() === req.body.products.product.toString())
            p.Quantity=p.Quantity+1;
        });
      }
      else
      {
        cart.products.push(req.body.products);
      }
        
        await cart.save({ validateBeforeSave: false }).then(console.log("secccess")).catch((err)=>{
          console.log(err)
        });;
    }
    else
    {
         cart = await Cart.create({
            user:req.user._id,
            products:req.body.products
           
        
          }).then(console.log("secccess")).catch((err)=>{
            console.log(err)
          });

    }
  
    console.log("cart",cart)
    res.status(200).json({
      success: true,
      cart,
    });
  });
  

  exports.updateCart = catchAsyncErrors(async (req, res, next) => {
    const { productId,quantity } = req.body;
   console.log(req.body)
    // const product = {
    //   user: ,
    //   name: req.user.name,
    //   rating: Number(rating),
    //   comment,
    // };
  
    const cart = await Cart.findOne({user:req.user._id});
    console.log("1")
    if(cart)
    {
      console.log("2")
        cart.products.forEach((item)=>{
          console.log("3")
            if(item.product.toString()===productId.toString())
            {
              console.log("4")
                item.Quantity = quantity
            }
        })
        await cart.save({ validateBeforeSave: false });
    }
    else
    {
        
        return next(new ErrorHander("Cannot Update In Cart", 404));

    }
  
    
    res.status(200).json({
      success: true,
    });
  });

  exports.getCart = catchAsyncErrors(async (req, res, next) => {
   const cart = await Cart.findOne({user:req.user._id});
 
    //  console.log(cart)
    // if (!cart) {
    //   return next(new ErrorHander("Cart not found", 404));
    // }
  
    res.status(200).json({
      success: true,
      cart,
    });
  });
  
  // Delete Review
  exports.deleteCart = catchAsyncErrors(async (req, res, next) => {
    const cart = await Cart.findOne({user:req.user._id});
    const id = cart._id
    console.log("hi")
   // console.log(cart.products)
    console.log(req.body.product)
    if (!cart) {
      return next(new ErrorHander("Cart Cannot be Deleted", 404));
    }
  
    const products = cart.products.filter(
        (item) => item.product.toString() !== req.body.product.toString()
      );
      console.log(products)
      await Cart.findByIdAndUpdate(
        id,
        {
         products
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    res.status(200).json({
      success: true,
    });
  });

  exports.deleteAllCart = catchAsyncErrors(async (req, res, next) => {
    const cart = await Cart.findOne({user:req.user._id});
  
    
    if (!cart) {
      return next(new ErrorHander("All Cart Cannot be Deleted", 404));
    }
  
   
  
   
  cart.products=[]
  await cart.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    
    });
  });
  
  

  
     
  