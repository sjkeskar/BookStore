import asyncHandler from "express-async-handler";
import db from "../config/db.js"

//@desc     Add to Cart
//@route    POST /api/cart/
//@access   Private
export const addBooktoCart = asyncHandler(async (req,res)=>{
    const {UserID, PriceID, Qty} = req.body;
    const CartID = Math.floor(Math.random()*1000)
    const sql = `INSERT INTO cart VALUES(${CartID},${PriceID},${Qty},${UserID})`
    db.query(sql,(error,result)=>{
        if(error){
            res.status(401)
            throw new Error("Could not add to Cart")
        }else if(result){
            res.status(201).send(result)
        }
    })
})