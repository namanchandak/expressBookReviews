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

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;

module.exports.users = users;
