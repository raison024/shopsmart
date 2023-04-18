const express = require('express');
const db = require('./config')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// // Route for creating a user
// app.post('/api/createuser', (req, res) => {

//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     db.query("INSERT INTO customers (cid, cname, cemail, cpass, cphone, gender, DOB) VALUES (NULL,?,?,?)", [name, email, password], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result)
//     });
// })

// Route for creating a user
app.post('/api/createuser', (req, res) => {

    const { userName, email, password, mobile, gender, dob } = req.body;
    const cusDetails = [userName, email, password, mobile, gender, dob];

    db.query("INSERT INTO customers (cid, cname, cemail, cpass, cphone, gender, DOB) VALUES (NULL,?,?,?,?,?,?)", cusDetails, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({success: true});
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

//Route to get username from email
app.post('/api/getusername', (req, res) => {
    const email = req.body.email;
    db.query("SELECT cname FROM customers WHERE cemail = ?", [email], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.send(result[0]);
            console.log(result[0])
        }
    });
});

//Route to get userid from email
app.post('/api/getuserid', (req, res) => {
    const email = req.body.email;
    db.query("SELECT cid FROM customers WHERE cemail = ?", [email], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.send(result[0]);
            console.log(result[0])
        }
    });
});

//Route to get full user info
app.get('/api/getuserinfo', (req, res) => {
    const cid = req.body.cid;
    db.query("SELECT * FROM customers WHERE cid = ?", [cid], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.send(result);
        }
    });
});

// Route to get all products
app.post("/api/getuserhistory", (req, res) => {
    const cid = req.body.cid;
    db.query("SELECT * FROM payment WHERE cid = ?", [cid], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            console.log(result)
        }
    });
});

// Route to get all products
app.get("/api/getallproducts", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});


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
            console.log(result);
        }
        else {
            res.send({ message: "Product not recognized!" });
        }
    });
});

// app.post("/api/getname", (req, res) =>  {

//     const name = req.body.name;

//     db.query("SELECT pname FROM products WHERE pid ?", [name], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(result);
//         console.log("this is vid"+vid)
//         res.send(result);
//     });
// });

// Route for insert into cart
app.post('/api/insertintocart', (req, res) => {

    const vid = req.body.vid;
    const cid = req.body.cid;
    const pid = req.body.pid;

    db.query("INSERT INTO virtual_cart (vc_id, cid, pid, quantity) VALUES (?,?,?,2)", [vid, cid, pid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

// Route to get cart items
app.post("/api/getcartitems", (req, res) => {

    const vid = req.body.vid;
    const cid = req.body.cid;

    db.query("SELECT * FROM products WHERE pid IN (SELECT pid FROM virtual_cart WHERE vc_id=? AND cid=?)", [vid, cid], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
        console.log(result);
    });
});

app.post("/api/gettotalcartprice", (req, res) => {

    const vid = req.body.vid;
    const cid = req.body.cid;

    db.query("SELECT SUM(price) FROM products WHERE pid IN (SELECT pid FROM virtual_cart WHERE vc_id=? AND cid=?)", [vid, cid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result);
        console.log("this is vid" + vid)
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
app.post("/api/deleteallcartitems", (req, res) => {

    const vid = req.body.vid;
    const cid = req.body.cid;

    db.query("DELETE FROM virtual_cart where vc_id=? AND cid=?", [vid, cid], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

// Route for creating a payment
app.post('/api/createpayment', (req, res) => {

    const cid = req.body.cid;
    const total = req.body.total;
    const vid = req.body.vid;

    db.query("INSERT INTO payment (pay_id, cid, total_pay, vc_id, pay_time) VALUES (NULL,?,?,?,NULL)", [cid, total, vid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

app.get('/api/get_pay_products/:pay_id', (req, res) => {
    const pay_id = req.params.pay_id
    db.query(' SELECT p.pid,p.pname, p.price, c.quantity FROM payment AS pay JOIN virtual_cart AS c ON pay.vc_id = c.vc_id JOIN products AS p ON c.pid = p.pid  WHERE pay.pay_id = ' + [pay_id] ,
    (err,result)=>{
        if(err){
            throw (err)
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

//Route to feedback post
app.post("/api/feedbacks", (req, res) => { 
    const { overall, offer, userFriendly, support, recommend, expectation } = req.body
    const rating = [overall, offer, userFriendly, support, recommend, expectation];
    
    db.query("INSERT INTO feedback (overall, offer, user_friendly, support, recommend, expectation) VALUES (?,?,?,?,?,?)", rating, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({success: true});
        }
    );
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})