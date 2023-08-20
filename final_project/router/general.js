const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const jwt = require('jsonwebtoken');
let authenticatedUser = require("./auth_users.js").authenticatedUser;




public_users.post("/register", (req,res) => {
  // Write your code here
  let usr = req.body.username 
  let pass = req.body.password

  if(usr && pass)
  {
     // let exist = users.filter( (users)=> users.username === usr )

    if(!isValid(usr))
    {
      users.push({username: usr , password : pass})
      return res.status(200 ).json({message : "user added"})
    }
    else
    {
      return res.status(404 ).json({message : "already added"})
    }
  }

    return res.status(404 ).json({message : "unable to add user"})
  
  // return res.status(300).json({message: "Yet to be implemented"});
});





// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // console.log("/")
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

  // return res.status(300).json({message: "Yet to be implemented"});

});



public_users.post("/login", (req,res) => {

  let usr = req.body.username 
  let pass = req.body.password

  if(!usr || !pass)
  {
    return res.status(404).json({message: "Error logging in"});
  }

  if(authenticatedUser(usr,pass))
  {
    let token = jwt.sign({ data: pass }, 'access', { expiresIn: 60*60 });

  //   req.session.authorization= {
  //     token,usr
  // }

    return res.status(200).send("User successfully logged in");
  }
  else
  {
    // users.push({username: usr , password : pass})
    return res.status(208).json({message: "Invalid Login. Check username and password"});
    
  }
});



public_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  
  let isb=req.params.isbn
  // // 
  
  let book=books[isb]
  // console.log(isbook)
  // let ne=req.params.delete
  if(book)
  {
    let next = req.body.reviews
    books[isb].reviews= next
    // rev.push(next)
    // books[isb].reviews = rev;

    res.send( books[isb] )
    
  }
  else 
  {
    res.send( {message : "book not exist"} )
  }

  // return res.status(300).json({message: "Yet to be implemented"});
});



public_users.delete("/auth/review/:isbn", (req, res) => 
{
  let del = req.params.isbn

  if(books[del])
  {
    delete books[del].reviews
    res.send( {message : "book review deleted"} )
  }
  else
  { 
    res.send( {message : "book not exist"} )

  } 

})



module.exports.general = public_users;
