const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

  let val = users.filter((user)=> users.useranme===username )

  if(val.length>0)
  {
    return true;
  }
  else
  {
    return false;
  }

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  
  let a = users.filter ( (user) => 
    {
     
      return  user.username ===  username && user.password===password
    }
  )
  if(a.length>0)
  {
    return true;
  }
  return false;
}

//only registered users can login
// regd_users.post("/login", (req,res) => {

//   let usr = req.body.username 
//   let pass = req.body.password

//   if(!usr || !pass)
//   {
//     return res.status(404).json({message: "Error logging in"});
//   }

//   if(authenticatedUser(usr,pass))
//   {
//     let token = jwt.sign({ data: pass }, 'access', { expiresIn: 60*60 });

//   //   req.session.authorization= {
//   //     token,usr
//   // }

//     return res.status(200).send("User successfully logged in");
//   }
//   else
//   {
//     // users.push({username: usr , password : pass})
//     return res.status(208).json({message: "Invalid Login. Check username and password"});
    
//   }
// });


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // console.log("auth")
  // let isbook=req.params.isbn
  // // 

  // // let ne=req.params.delete
  // if(isbook)
  // {
  //   let next=req.params.reviews

  //   let rev=books[is].reviews
  //   rev.push(next)
  //   books[is].reviews = rev;

  //   res.send( {message : "review added"} )
    
  // }
  // else 
  // {
  //   res.send( {message : "book not exist"} )
  // }


  return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {


  let isbook=req.params.isbn
  // 

  // let ne=req.params.delete
  if(isbook)
  {
    let next=req.params.reviews

    // let rev=books[is].reviews
    // rev.push(next)
    delete books[is].reviews;

    res.send( {message : "review deleted"} )
    
  }
  else 
  {
    res.send( {message : "book not exist"} )
  }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;

module.exports.users = users;
