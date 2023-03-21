const express = require("express");
const db = require("./config");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) console.log(err);
        
        res.send(result);
    });
});

<<<<<<< HEAD
// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
    const id = req.params.id;
    
    db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

=======
>>>>>>> 14add5c394394ed17fbc16ad018f762ae2bd7ca3
// Route for creating a user
app.post("/api/createuser", (req, res) => {
    const { userName, email, password, mobile } = req.body;
    const cusDetails = [userName, email, password, mobile];

<<<<<<< HEAD
    db.query("INSERT INTO customers (cname, cemail, cpass, cphone) VALUES (?,?,?,?)", cusDetails, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({success: true});
        }
    );
});
=======
    const email = req.body.email;
    const password = req.body.password;
    
    db.query("INSERT INTO customer (c_id, c_name, c_pass) VALUES (NULL,?,?)",[email,password], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
    });   })

// Route to check product for cart
app.post('/api/getname', (req,res)=>{
    const name = req.body.name;
    db.query("SELECT * FROM product where pname = ?",[name], (err,result)=>{
    if(err) {
        res.send({ err:err });
    } 
    if(result.length>0) {
        res.send(result);   
        console.log("Success!!!!");
    }
    else {
        res.send({ message: "Product not recognized!" });
    }
    });   });
>>>>>>> 14add5c394394ed17fbc16ad018f762ae2bd7ca3

//Route to login
app.post("/api/loginuser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM customers where cemail = ? and cpass = ?", [email, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Wrong Email/Password Combination!" });
        }
    });
});

// Route to like a post
app.post("/api/like/:id", (req, res) => {
    const id = req.params.id;
    
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
            console.log(result);
        }
    );
});

// Route to delete a post

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
