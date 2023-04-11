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
        res.send(result);
        console.log(result);
    });
});

app.post("/api/gettotalcartprice", (req, res) =>  {
    
    const vid = req.body.vid;

    db.query("SELECT SUM(pprice) FROM product WHERE pid IN (SELECT pid FROM cart WHERE vc_id=?)", [vid], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result);
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

    db.query("DELETE FROM cart where vc_id=?", [vid], (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})


//Route to login
app.post('/api/loginuser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM customer where c_name = ? and c_pass = ?", [email, password], (err, result) => {
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