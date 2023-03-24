const express = require("express");
const db = require("./config");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Route for creating a user
app.post('/api/createuser', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO customer (c_id, c_name, c_pass) VALUES (NULL,?,?)", [email, password], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

// Route to check product for cart
app.post('/api/getname', (req, res) => {
    const name = req.body.name;
    db.query("SELECT * FROM product where pid = ?", [name], (err, result) => {
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

    db.query("INSERT INTO cart (vc_id, cid, pid, cquantity, ctotal) VALUES (?,1,?,1,100)", [vid, pid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

// Route to get cart items
app.post("/api/getcartitems", (req, res) => {

    const vid = req.body.vid;

    db.query("SELECT * FROM product WHERE pid IN (SELECT pid FROM cart WHERE vc_id=?)", [vid], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});


//Route to login
app.post('/api/loginuser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM customer where c_name = ? and c_pass = ?", [email, password], (err, result) => {
=======
// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) console.log(err);
        
        res.send(result);
    });
});

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

// Route for creating a user
app.post("/api/createuser", (req, res) => {
    const { userName, email, password, mobile } = req.body;
    const cusDetails = [userName, email, password, mobile];

    db.query("INSERT INTO customers (cname, cemail, cpass, cphone) VALUES (?,?,?,?)", cusDetails, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({success: true});
        }
    );
});

//Route to login
app.post("/api/loginuser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM customers where cemail = ? and cpass = ?", [email, password], (err, result) => {
>>>>>>> 9fc5792d1d72877ad84cf6dbf50423c6f1d42fe7
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
<<<<<<< HEAD
app.post('/api/like/:id', (req, res) => {

    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
=======
app.post("/api/like/:id", (req, res) => {
    const id = req.params.id;
    
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
            console.log(result);
        }
    );
>>>>>>> 9fc5792d1d72877ad84cf6dbf50423c6f1d42fe7
});

// Route to delete a post

<<<<<<< HEAD
app.delete('/api/delete/:id', (req, res) => {
=======
app.delete("/api/delete/:id", (req, res) => {
>>>>>>> 9fc5792d1d72877ad84cf6dbf50423c6f1d42fe7
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
        if (err) {
<<<<<<< HEAD
            console.log(err)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
=======
            console.log(err);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
>>>>>>> 9fc5792d1d72877ad84cf6dbf50423c6f1d42fe7
