const exppress = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = exppress();
app.use(exppress.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopro"
})

app.get("/i",(req,res) =>{
    const sql = "SELECT * FROM persona";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.post('/create',(req, res)=>{
    const sql = "INSTERT INTO persona ('ID_Persona','Nombres','Apellido1','Apellido2','FechaNac','Correo','Telefono') VALUES (?)";
    const values =[
        req.body.ID_Persona,
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.FechaNac,
        req.body.Correo,
        req.body.Telefono
    ]
    db.query(sql,[values],(err,data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081,() => {
    console.log("Listening ");
})