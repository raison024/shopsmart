// const express = require('express')
// var router = express.Router()
// const db = require('./config')


// const adminLogin = (req,res)=> {
//     const email = req.body.email
//     const password = req.body.password
//     // console.log(email,password)
//     db.query("SELECT * FROM admin where email = ? and password = ?" ,[email,password],(err,result)=>{
//         if(err)
//            console.log(err)
//            res.send({err:err});
//         if(result.length>0){
//             res.send(result);
//             console.log(result)
//         }
//         else{
//             res.send({message: "Wrong Email/Password Combination!"})
//         }
        
//     })
//  }
// router.post("/api/loginadmin",adminLogin)




// // app.post('/api/loginuser', (req,res)=> {
// //     const email = req.body.email;
// //     const password = req.body.password;
// //     db.query("SELECT * FROM customer where c_name = ? and c_pass = ?",[email, password], (err,result)=>{
// //         if(err) {
// //             res.send({ err:err });
// //         }

// //         if(result.length>0) {
// //             res.send(result);
// //         }
// //         else {
// //             res.send({ message: "Wrong Email/Password Combination!" });
// //         }
// //     })
// // })


// module.exports = { adminLogin };