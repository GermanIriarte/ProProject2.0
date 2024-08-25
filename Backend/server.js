const exppress = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = exppress();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopro"
})
app.get("/",(req,res) =>{
    const sql = "SELECT * FROM persona";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.listen(8081,() => {
    console.log("Listening ");
})