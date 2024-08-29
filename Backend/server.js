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


app.post("/createPersona", (req, res) => {
    const sql = "INSERT INTO `persona` (`Nombres`, `Apellido1`, `Apellido2`, `FechaNac`, `Correo`, `Telefono`) VALUES (?)";
    const values = [
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.FechaNac,
        req.body.Correo,
        req.body.Telefono
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("data se mando de manera exitosa");
    });
});

app.post("/createProducto", (req, res) => {
    const sql = "INSERT INTO `productos` (`Nombre`, `Cantidad`, `Precio`, `Categoria`) VALUES (?)";
    const values = [
        req.body.Nombre,
        req.body.Cantidad,
        req.body.Precio,
        req.body.Categoria,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("data se mando de manera exitosa");
    });
});

app.get("/readProductos",(req,res) =>{
    const sql = "SELECT * FROM productos";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.get("/readPersona",(req,res) =>{
    const sql = "SELECT * FROM persona";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.put('/updatePersona/:ID_Persona', (req, res) => {
    const ID_Persona = req.params.ID_Persona
    const sql = "UPDATE `persona` SET `Nombres` = ?, `Apellido1` = ?, `Apellido2` = ?, `FechaNac` = ?, `Correo` = ?, `Telefono` = ? where ID_Persona = ?";
    const values = [
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.FechaNac,
        req.body.Correo,
        req.body.Telefono
    ]
    
    db.query(sql, [...values, ID_Persona], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("data UPDATED SUCCESS");
    });
});

app.put('/updateProducto/:Cod_Producto', (req, res) => {
    const Cod_Producto = req.params.Cod_Producto;
    
    const sql = "UPDATE `productos` SET `Nombre` = ?, `Cantidad` = ?, `Precio` = ?, `Categoria` = ? where Cod_Producto = ?";
    const values = [
        req.body.Nombre,
        req.body.Cantidad,
        req.body.Precio,
        req.body.Categoria
    ]
    
    db.query(sql, [...values, Cod_Producto], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("data UPDATED SUCCESS");
    });
});

app.delete('/deletePersona/:ID_Persona', (req, res) => {
    const ID_Persona = req.params.ID_Persona;
    console.log("ID_Persona to delete:", ID_Persona); // Verifica si el ID_Persona es correcto
    const sql = "DELETE FROM `persona` WHERE ID_Persona = ?";
    db.query(sql, [ID_Persona], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("Data DELETED SUCCESS");
    });
});

app.delete('/deleteProducto/:Cod_Producto', (req, res) => {
    const Cod_Producto = req.params.Cod_Producto;
    console.log("Cod_Producto to delete:", Cod_Producto); // Verifica si el Cod_Producto es correcto
    const sql = "DELETE FROM `productos` WHERE Cod_Producto = ?";
    db.query(sql, [Cod_Producto], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("Data DELETED SUCCESS");
    });
});


app.listen(8081,() => {
    console.log("Listening ");
})