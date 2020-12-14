import asyncHandler from "express-async-handler";
import db from "../config/db.js"

//@desc     GET all books
//@route    GET /api/books
//@access   Public
export const getAllBooks = asyncHandler(async (req, res) => {
    const sql = `select * from books`;
    db.query(sql, (error, result)=>{
        if(error){
            res.status(404);
            throw new Error(error);
        }else{
            res.status(200);
            res.send(JSON.parse(JSON.stringify(result)));
        }
    })
});

//@desc     Add a books
//@route    POST /api/books
//@access   Public (later Private)
export const addBook = asyncHandler(async (req, res) => {
    const {id, name, desc, author, genre} = req.body;
    const sql = `INSERT INTO books VALUES (${id},'${name}','${desc}','${author}','${genre}')`;
    db.query(sql, (error, result)=>{
        if(error){
            res.status(404);
            throw new Error(error);
        }else{
            res.status(200);
            res.send(`Book added...`);
        }
    })
});

//@desc     Find the price of a book
//@route    Get /api/books/:id
//@access   Public
export const findBook = asyncHandler(async (req, res) => {
    const sql = `SELECT * FROM price,books WHERE price.BookID=${req.params.id} AND books.BookID=price.BookID`;
    db.query(sql, (error, result)=>{
        if(error){
            res.status(404);
            throw new Error(error);
        }else{
            res.status(200);
            res.send(JSON.parse(JSON.stringify(result)));
        }
    })
});

//@desc     Find a book and it's specific price
//@route    Get /api/books/price/:id
//@access   Public
export const findPriceSpecified = asyncHandler(async (req, res) => {
    const sql = `SELECT * FROM price,books WHERE price.BookID=books.BookID AND PriceID=${req.params.id}`;
    db.query(sql, (error, result)=>{
        if(error){
            res.status(404);
            throw new Error(error);
        }else{
            res.status(200);
            res.send(JSON.parse(JSON.stringify(result)));
        }
    })
});


//unnecessary functions

// //@desc     Find a book with all it's prices
// //@route    Get /api/books//:id
// //@access   Public
// export const findPriceSpecified = asyncHandler(async (req, res) => {
//     const sql = `SELECT * FROM price WHERE BookID=${req.params.id}`;
//     db.query(sql, (error, result)=>{
//         if(error){
//             res.status(404);
//             throw new Error(error);
//         }else{
//             res.status(200);
//             res.send(JSON.parse(JSON.stringify(result)));
//         }
//     })
// });