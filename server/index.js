
const express = require('express');
const db = require('./config')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// const admin = require('./admin');
// app.use('/api/loginadmin', admin.adminLogin);

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {

    const id = req.params.id;
    db.query("SELECT * FROM posts WHERE id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});

// Route for creating a user
app.post('/api/createuser', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    res.send(email)

    db.query("INSERT INTO customers (cid, cname, c_pass) VALUES (NULL,?,?)", [email, password], (err, result) => {
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
    console.log(req.body)
    db.query("SELECT * FROM customers where cemail = ? and cpass = ?", [email, password], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ err: err });
        } else {

            if (result.length > 0) {
                // console.log(result)
                res.send(result);
            }
            else {
                res.send({ message: "Wrong Email/Password Combination!" });
            }
        }

        // console.log(result)
    })
})

//Route to admin login
app.post('/api/loginadmin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM admin where email = ? and password = ?", [email, password], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ err: err });
        }

        if (result.length > 0) {
            console.log(result)
            res.send(result);
        }
        else {
            res.send({ message: "Wrong Email/Password Combination!" });
        }
        // console.log(result)
    })

})



// Route to add a product by the admin 
app.post('/api/add_product', (req, res) => {
    const pname = req.body.pname;
    const price = req.body.price;
    const cat_name = req.body.cat_name;
    const pdesc = req.body.pdesc;
    const pimg = req.body.pimg;
    const pstock = req.body.pstock;

    const cat_q = 'INSERT INTO CATEGORY VALUES (NULL,"' + cat_name + '")'
    db.query(cat_q, (err, result) => {
        if (err) {
            console.log(err)
            res.send({ err: err });
        }
        else {
            console.log(result)
            if (result.length > 0) {
                // console.log(result)
                res.send(result);
            }
        }
    })
    const cat_id_q = 'SELECT cat_id from CATEGORY where cat_name="' + cat_name + '"';
    let temp = 0;
    db.query(cat_id_q, (err, result) => {
        if (err)
            throw err
        else {
            temp = result[0].cat_id
            console.log("Result cat_id : " + temp)
            const pro_q = 'INSERT INTO PRODUCTS VALUES(NULL,"' + pname + '",' + temp + ',' + price + ',' + '"' + pdesc + '","' + pimg + '",' + pstock + ')';
            db.query(pro_q, (err, result) => {
                if (err)
                    throw err
                else {
                    res.send("Product " + pname + " added successfully!!")
                }
            })
        }
    })
})

//Read Products
app.get('/api/get_product',(req,res)=>{
    const getp_q ='SELECT * FROM PRODUCTS'
    db.query(getp_q,(err,result)=>{
        if(err) 
          throw(err)
        else{
              console.log(result)
              res.send(result)
        }
    })
})

app.delete('/api/delete_product',(req,res)=>{
    const PID=req.body.pid
    const delp_q='DELETE FROM PRODUCTS WHERE PID = ' + PID;
    db.query(delp_q,(err,result)=>{
        if(err)
           throw err;
        else{
            console.log('Product with pid = '+PID+' deleted succesfully!')
            res.send('Product with pid = '+PID+' deleted succesfully!')
        }
    })
})

//Delete product
app.post('/api/deleteprod', (req,res) => {
    const pid = req.body.pid;

    db.query('DELETE FROM PRODUCTS WHERE PID=?', [pid], (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//Read Payments
app.post('/api/read_payments')

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
    console.log(`Server is running on http://localhost:${PORT}`)
})