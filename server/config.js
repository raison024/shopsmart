const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database:"smartcheckout" 
})

db.connect((err) => {
if (err) throw err;
else {
    console.log("MySQL Connected Successfully!");
}
});

module.exports = db;