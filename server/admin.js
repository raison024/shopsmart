const express = require('express')
var router = express.Router()
const db = require('./config')
const cors = require('cors')

const app = express();
const PORT = 3003;
app.use(cors());
app.use(express.json())

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

//Route to get recent payments
app.get('/api/read_rec_pay',(req,res)=>{
    const recPayQ ='Select *,cname from payment inner join customers on customers.cid = payment.cid order by pay_id desc limit 4';
    db.query(recPayQ,(err,result)=>{
        if(err){
            console.log(err)
            throw err
        }
        else{
            console.log("Result : " + result)
            res.send(result)
        }
    })
})

//Route to read cat_name s for adding product
app.get('/api/read_cat_name', (req, res) => {
    const catnameq = 'SELECT cat_name from CATEGORY'
    db.query(catnameq, (err, result) => {
        if (err)
            throw err
        else {
            res.send(result)
        }
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
app.get('/api/get_product', (req, res) => {
    const getp_q = 'SELECT * FROM PRODUCTS'
    db.query(getp_q, (err, result) => {
        if (err)
            throw (err)
        else {
            for (let i = 0; i < result.length; i++) {
                result[i].pimg = result[i].pimg.toString('utf8')
            }
            console.log(result)
            res.send(result)
        }
    })
})


//Delete product
app.post('/api/deleteprod', (req, res) => {
    const pid = req.body.pid;

    db.query('DELETE FROM PRODUCTS WHERE PID=?', [pid], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {

            res.send(result)
        }
    })
})

//Update Products - Read 
app.get('/api/read_update_product/:pid', (req, res) => {
    const pid = req.params.pid
    let send_data = {
        "pid": 0,
        "pname": "",
        "cat_id": 0,
        "price": 1200,
        "pdesc": "",
        "pimg": "",
        "STOCKS": 0,
        "cat_name": ""
    }
    let temp = 0;
    const upget_q = 'SELECT * FROM PRODUCTS WHERE pid =' + pid
    db.query(upget_q, (err, result) => {
        if (err)
            throw (err)
        else {
            send_data.pid = result[0].pid
            send_data.pname = result[0].pname
            send_data.cat_id = result[0].cat_id
            send_data.price = result[0].price
            send_data.pdesc = result[0].pdesc
            send_data.pimg = result[0].pimg.toString('utf8')
            send_data.STOCKS = result[0].STOCKS

            // console.log(send_data)

            temp = result[0].cat_id
            const catget_g = 'SELECT cat_name FROM CATEGORY WHERE cat_id =' + temp
            db.query(catget_g, (err, result) => {
                if (err)
                    throw err
                else {
                    send_data.cat_name = result[0].cat_name
                    // console.log("The sending data is : " + JSON.stringify(send_data))
                    res.send(send_data)
                }

            })


        }
    })
})


//Reading Categories
app.get('/api/read_categories', (req, res) => {
    const catq = 'SELECT * FROM CATEGORY';
    db.query(catq, (err, result) => {
        if (err)
            console.log(err)
        else {
            res.status(200)
            // console.log(result)
            res.send(result)
        }
    })
})
//Adding Categories
app.post('/api/add_categories', (req, res) => {
    const cat_name = req.body.cat_name
    console.log("cat_name : " + cat_name)
    const ins_catq = 'INSERT INTO CATEGORY VALUES (NULL,"' + cat_name + '")'
    db.query(ins_catq, (err) => {
        if (err)
            console.log(err)
        else {
            res.status(200)
            res.send('Inserted new category : ' + cat_name)
        }
    })
})

//Deleting Categories
app.post('/api/delete_categories', (req, res) => {

    const del_cat_id = req.body.cat_id
    console.log("Deleted Category ID : " + del_cat_id)
    const delproq = 'DELETE FROM PRODUCTS WHERE cat_id = ' + del_cat_id
    db.query(delproq, (err) => {
        if (err)
            console.log(err)
        // else{
        //     console.log('Deleted products with category id : ' + del_cat_id)
        // }
    })
    const delcatq = 'DELETE FROM CATEGORY WHERE cat_id=' + del_cat_id
    db.query(delcatq, (err, result) => {
        if (err)
            throw err
        else {
            res.status(200)
            res.send(result)
        }
    })
})



// //Update Products - update
app.post('/api/submit_update_product/:pid', (req, res) => {

    const pid = req.body.pid
    const pname = req.body.pname
    const cat_name = req.body.cat_name
    const price = req.body.price
    const STOCKS = req.body.STOCKS
    const pimg = req.body.pimg
    const pdesc = req.body.pdesc

    console.log("Json : " + req.body.STOCKS)
    // res.send("Category : " +cat_name)
    const catq = "Select cat_id  from category where cat_name = \'" + cat_name + "\'"
    var cat_id = 0


    db.query(catq, (err, result) => {
        if (err)
            console.log(err)
        else {
            cat_id = result[0].cat_id
            const updateq = 'update products set pname = \"' + pname + '\",cat_id = ' + cat_id + ', price = ' + price + ' , pdesc = \"' + pdesc + '\",pimg =\" ' + pimg + "\",stocks = " + STOCKS + ' where pid = ' + pid
            db.query(updateq, (err, result) => {
                if (err)
                    console.log(err)
                else {
                    res.send(result)
                }
            })
        }
    })

})


//Read Payments
app.get('/api/read_payments', (req, res) => {
    const payq = 'SELECT customers.cname, payment.* FROM payment INNER JOIN customers ON payment.cid = customers.cid';
    db.query(payq, (err, result) => {
        if (err)
            throw err
        else {
            res.status(200)
            console.log(result)
            res.send(result)
        }
    })
})


//Read Feedbacks
app.get('/api/read_feedbacks', (req, res) => {
    const feedq = 'SELECT * FROM FEEDBACK'
    db.query(feedq, (err, result) => {
        if (err)
            throw err
        else {
            res.status(200)
            console.log(result)
            res.send(result)
        }
    })
})

// Route to delete a post
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})

//Reading Customers
app.get('/api/read_customers', (req, res) => {
    const read_cq = 'SELECT cid,cname,cemail,cphone,gender,dob from customers'
    db.query(read_cq, (err, result) => {
        if (err)
            throw (err)
        else {
            res.status(200)
            res.send(result)
        }
    })
})

//Deleting customers
app.post('/api/delete_customers', (req, res) => {
    const cid = req.body.cid
    const delete_c = 'DELETE FROM CUSTOMERS WHERE cid=' + cid
    db.query(delete_c, (err, result) => {
        if (err)
            console.log(err)
        else {
            console.log("Customer deleted!!!")
            res.send(result)
        }
    })
})

// Get Popular Products
app.get('/api/read_pop_products', (req, res) => {
    // Execute the MySQL query
    db.query(
        'SELECT p.pname, v.pid, SUM(v.quantity * p.price) AS earnings FROM virtual_cart v JOIN products p ON p.pid = v.pid GROUP BY v.pid ORDER BY earnings DESC LIMIT 4',
        (error, results, fields) => {
            if (error) {
                // Handle the error
                console.log(error);
                res.status(500).send('Internal Server Error');
            } else {
                // Return the results as an array of objects
                const popularProducts = results.map((row) => {
                    return {
                        pname: row.pname,
                        pid: row.pid,
                        earnings: row.earnings
                    };
                });
                res.send(popularProducts);
            }
        }
    );
});

//Get Recent Feedback
app.get('/api/recent_fb', (req, res) => {
    db.query('Select expectation from feedback order by fid desc limit 1', (err, result) => {
        if (err)
            console.log(err)
        else {
            res.send(result[0])
        }
    })
})
//Get Past Week Revenue
app.get('/api/recent_week_rev', (req, res) => {
    db.query('SELECT SUM(total_pay) as week_pay FROM payment  WHERE pay_time >= DATE_SUB(NOW(), INTERVAL 1 WEEK)', (err, result) => {
        if (err)
            console.log(err)
        else {
            res.send(result[0]);
        }
    })
})
//Get Customers
app.get('/api/get_total_customers', (req, res) => {
    db.query('SELECT COUNT(*) AS total_cus FROM CUSTOMERS', (err, result) => {
        if (err)
            throw (err)
        else {
            res.send(result[0]);
        }
    })
})
//Reading Payment details
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
//Reading User Payments
app.get('/api/get_user_payhis/:cid',(req,res)=>{
    const cid = req.params.cid
    db.query('SELECT * from payment where cid = '+[cid]+' order by pay_id desc',(err,result)=>{
        if(err)
         throw err
        else{
            res.send(result)
        }
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
