const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let usr = req.body.username 
  let pass = req.body.password

  if (!usr || !pass) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }

  let exist = users.filter( (users)=> users.username === usr )

  if(exist.length>0)
  {
    res.send( {message : "already exist"} )
  }
  else
  {
    users.push({username: usr , password : pass})
    res.send( {message : "user added"} )
  }


  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4))
  // return res.status(300).json({message: "Here is the book list"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let bookD=req.params.isbn
  res.send(books[bookD])
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let auth = req.params.author

  let det = Object.values(books).filter( (books) => books.author === auth ) 
  if(det.length>0)
  {
    res.send(det)
  }
  else
  {
    res.send( {message : "book not found"} )
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let tit = req.params.title

  let det = Object.values(books).filter( (books) => books.title === tit ) 
  if(det.length>0)
  {
    res.send(det)
  }
  else
  {
    res.send( {message : "book not found"} )
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let bookR=req.params.isbn
  if(bookR)
  res.send(books[bookR].reviews)
  else
  {
    res.send( {message : "book not found"} )
  }

});

module.exports.general = public_users;
