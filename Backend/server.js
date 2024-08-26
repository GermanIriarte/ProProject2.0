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


app.post("/create", (req, res) => {
    const sql = "INSERT INTO `persona` (`Nombres`, `Apellido1`, `Apellido2`, `FechaNac`, `Correo`, `Telefono`) VALUES (?)";
    const values = [
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.FechaNac,
        req.body.Correo,
        req.body.Telefono
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.get("/",(req,res) =>{
    const sql = "SELECT * FROM persona";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.put('/update/:ID_Persona', (req, res) => {
    const sql = "update `persona` set `Nombres` = ?, `Apellido1` = ?, `Apellido2` = ?, `FechaNac` = ?, `Correo` = ?, `Telefono` = ? where ID_Persona = ?";
    const values = [
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.FechaNac,
        req.body.Correo,
        req.body.Telefono
    ];
    const ID_Persona = req.params.ID_Persona
    db.query(sql, [...values, ID_Persona], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.listen(8081,() => {
    console.log("Listening ");
})