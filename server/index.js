const express = require('express');
const db = require('./config')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route for creating a user
app.post('/api/createuser', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO customers (cid, cname, cemail, cpass, cphone, gender, DOB) VALUES (NULL,?,?,?)", [name, email, password], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

//Route to login
app.post('/api/loginuser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM customers where cemail = ? and cpass = ?", [email, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.send({ message: "Wrong Email/Password Combination!" });
        }
    })
})

// Route to get all products
app.get("/api/getallproducts", (req,res)=>{
    db.query("SELECT * FROM products", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });


// Route to check product for cart
app.post('/api/getname', (req, res) => {
    const name = req.body.name;
    db.query("SELECT * FROM products where pid = ?", [name], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
            console.log("Success!!!!");
        }
        else {
            res.send({ message: "Product not recognized!" });
        }
    });
});

// Route for insert into cart
app.post('/api/insertintocart', (req, res) => {

    const vid = req.body.vid;
    const pid = req.body.pid;

    db.query("INSERT INTO virtual_cart (vc_id, cid, pid, cat_id, quantity) VALUES (?,1,?,1,2)", [vid, pid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

// Route to get cart items
app.post("/api/getcartitems", (req, res) => {

    const vid = req.body.vid;

    db.query("SELECT * FROM products WHERE pid IN (SELECT pid FROM virtual_cart WHERE vc_id=?)", [vid], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
        console.log(result);
    });
});

app.post("/api/gettotalcartprice", (req, res) =>  {
    
    const vid = req.body.vid;

    db.query("SELECT SUM(price) FROM products WHERE pid IN (SELECT pid FROM virtual_cart WHERE vc_id=?)", [vid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result);
        console.log("this is vid"+vid)
        res.send(result);
    });
});

// app.post("/api/getcartitems", (req, res) => {

//     const vid = req.body.vid;

//     db.query("SELECT * FROM product WHERE pid IN (SELECT pid FROM cart WHERE vc_id=?)", [vid], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         res.send(result)
//     });
// });


//Route to delete all cart items
app.post("/api/deleteallcartitems", (req,res) => {
    
    const vid = req.body.vid;

    db.query("DELETE FROM virtual_cart where vc_id=?", [vid], (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})


// Route to like a post
app.post('/api/like/:id', (req, res) => {

    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

// Route to delete a post

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})