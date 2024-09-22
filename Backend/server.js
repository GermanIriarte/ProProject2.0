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

app.post("/createEmpleado", (req, res) => {
    // Iniciar la transacción
    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return res.json("Transaction Error");
        }

        // Insertar en la tabla persona
        const sqlPersona = "INSERT INTO `persona` (`Nombres`, `Apellido1`, `Apellido2`, `FechaNac`, `Correo`, `Telefono`) VALUES (?)";
        const valuesPersona = [
            req.body.Nombres,
            req.body.Apellido1,
            req.body.Apellido2,
            req.body.FechaNac,
            req.body.Correo,
            req.body.Telefono
        ];

        db.query(sqlPersona, [valuesPersona], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error(err);
                    return res.json("Error inserting into persona");
                });
            }

            // Obtener el ID_Persona recién insertado
            const ID_Persona = result.insertId;

            // Insertar en la tabla empleado utilizando el ID_Persona
            const sqlEmpleado = "INSERT INTO `empleado` (`ID_Persona`, `Usuario`, `Contraseña`, `Tipo_Usuario`) VALUES (?, ?, ?, ?)";
            const valuesEmpleado = [
                ID_Persona,
                req.body.Usuario,
                req.body.Contraseña,
                req.body.Tipo_Usuario 
            ];

            db.query(sqlEmpleado, valuesEmpleado, (err, data) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err);
                        return res.json("Error inserting into empleado");
                    });
                }

                // Confirmar la transacción
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error(err);
                            return res.json("Transaction Commit Error");
                        });
                    }

                    return res.json("Empleado created successfully");
                });
            });
        });
    });
});

app.post("/createCliente", (req, res) => {
    // Iniciar la transacción
    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return res.json("Transaction Error");
        }

        // Insertar en la tabla persona
        const sqlPersona = "INSERT INTO `persona` (`Nombres`, `Apellido1`, `Apellido2`, `FechaNac`, `Correo`, `Telefono`) VALUES (?)";
        const valuesPersona = [
            req.body.Nombres,
            req.body.Apellido1,
            req.body.Apellido2,
            req.body.FechaNac,
            req.body.Correo,
            req.body.Telefono
        ];

        db.query(sqlPersona, [valuesPersona], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error(err);
                    return res.json("Error inserting into persona");
                });
            }

            // Obtener el ID_Persona recién insertado
            const ID_Persona = result.insertId;

            // Insertar en la tabla cliente utilizando el ID_Persona
            const sqlCliente = "INSERT INTO `cliente` (`ID_Persona`, `Puntos`) VALUES (?, ?)";
            const valuesCliente = [ID_Persona, req.body.Puntos];

            db.query(sqlCliente, valuesCliente, (err, data) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err);
                        return res.json("Error inserting into cliente");
                    });
                }

                // Confirmar la transacción
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error(err);
                            return res.json("Transaction Commit Error");
                        });
                    }

                    return res.json("Cliente created successfully");
                });
            });
        });
    });
});


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

app.post("/createProveedor", (req, res) => {
    const sql = "INSERT INTO `proveedor` (`Nombre_Proveedor`) VALUES (?)";
    const values = [
        req.body.Nombre_Proveedor
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("data se mando de manera exitosa");
    });
});

app.post('/login', (req,res)=>{
    console.log("probando");
    const sql = "SELECT * FROM Empleado WHERE Usuario = ? AND Contraseña = ?";
    db.query(sql, [req.body.Usuario,req.body.Contraseña ], (err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");

        } else{
            
            return res.json("Failed");
        }
    })
})

app.post('/RegistrarCompra', (req, res) => {
    const { cedula, codigoProducto, cantidad } = req.body;
    const factor = 0.05;

    // Disminuir la cantidad en la tabla de productos
    const sqlUpdateProduct = "UPDATE productos SET cantidad = cantidad - ? WHERE cod_producto = ?";
    db.query(sqlUpdateProduct, [cantidad, codigoProducto], (err, result) => {
        if (err) return res.json({ error: 'Error actualizando la cantidad del producto' });

        // Obtener el precio del producto
        const sqlGetPrice = "SELECT precio FROM productos WHERE cod_producto = ?";
        db.query(sqlGetPrice, [codigoProducto], (err, data) => {
            if (err) return res.json({ error: 'Error obteniendo el precio del producto' });

            const precio = data[0].precio;

            // Obtener los puntos actuales del cliente
            const sqlGetPoints = "SELECT puntos FROM cliente WHERE id_persona = ?";
            db.query(sqlGetPoints, [cedula], (err, pointsData) => {
                if (err) return res.json({ error: 'Error obteniendo los puntos del usuario' });

                const puntosActuales = pointsData[0] ? pointsData[0].puntos : 0; // Si el cliente no tiene puntos, se establece en 0
                const puntosGanados = puntosActuales + (precio * cantidad * factor);

                // Añadir los puntos al usuario
                const sqlUpdateUser = "UPDATE cliente SET puntos = ? WHERE id_persona = ?";
                db.query(sqlUpdateUser, [puntosGanados, cedula], (err, result) => {
                    if (err) return res.json({ error: 'Error actualizando los puntos del usuario' });

                    return res.json({ message: 'Compra registrada exitosamente' });
                });
            });
        });
    });
});

app.post("/createCompra", (req, res) => {
    const sql = "INSERT INTO `factura_venta` (`Fecha`, `ID_Persona`) VALUES (?)";
    const values = [
        req.body.Fecha,
        req.body.ID_Persona,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }
        return res.json("data se mando de manera exitosa");
    });
});

app.post("/createItemVendido/:Cod_Factura", (req, res) => {
    // Obtener el Cod_Factura de la URL
    const Cod_Factura = req.params.Cod_Factura;

    // SQL para insertar el nuevo item
    const sql = "INSERT INTO `Item_Vendido` (`Cod_Producto`, `Cod_Factura`, `Cantidad`) VALUES (?, ?, ?)";

    // Valores a insertar, incluyendo Cod_Factura de la URL
    const values = [
        req.body.Cod_Producto,
        Cod_Factura,  // Tomamos el Cod_Factura directamente de la URL
        req.body.Cantidad
    ];

    // Ejecutar la consulta
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error al añadir el item");
        }
        return res.json("Item añadido correctamente con Cod_Factura: " + Cod_Factura);
    });
});

app.get('/sales', (req, res) => {    
    const date = req.query.date;
    const query = `
      SELECT
        p.Cod_Producto,
        p.Nombre,
        SUM(iv.cantidad) AS cantidad_total,
        p.Precio,
        SUM(iv.cantidad * p.precio) AS ventas_totales
      FROM
        Factura_Venta f
      JOIN
        Item_Vendido iv ON f.Cod_Factura = iv.Cod_Factura
      JOIN
        Productos p ON iv.Cod_Producto = p.Cod_Producto
      WHERE
        DATE(f.Fecha) = ?
      GROUP BY
        p.Cod_Producto, p.Nombre, p.Precio
      ORDER BY
        ventas_totales DESC;
    `;
    db.query(query, [date], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error al obtener los datos de ventas');
      } else {
        // Calcular las ganancias totales del día
        const totalEarnings = results.reduce((total, item) => total + item.ventas_totales, 0);
        res.json({ sales: results, totalEarnings });
        console.log("Sent: ", results, " , ", totalEarnings);
      }
    });
  });


app.get("/readProductos",(req,res) =>{
    const sql = "SELECT * FROM productos";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.get('/readProducto', (req, res) => {
    const { Cod_Producto } = req.query;

    // Consulta SQL para obtener el producto por su código
    const sql = 'SELECT * FROM productos WHERE Cod_Producto = ?';

    db.query(sql, [Cod_Producto], (err, result) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json(result);
        }
    });
});

app.get("/readPersona",(req,res) =>{
    const sql = "SELECT * FROM persona";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.get('/readPersonaCedula', (req, res) => { //dada una cedula
    const { ID_Persona } = req.query;  // Obtener la cédula desde los parámetros de la query
    console.log('Consultando datos del empleado con cédula:', ID_Persona);

    const sql = `
        SELECT p.ID_Persona, p.Nombres, p.Apellido1, p.Apellido2, p.FechaNac, p.Correo, p.Telefono, 
               e.Usuario, e.Contraseña, e.Tipo_Usuario
        FROM Persona p
        LEFT JOIN Empleado e ON p.ID_Persona = e.ID_Persona
        WHERE p.ID_Persona = ?
    `;

    db.query(sql, [ID_Persona], (err, result) => {
        if (err) {
            console.error('Error al consultar empleado:', err);
            return res.status(500).send('Error al consultar empleado');
        }

        if (result.length > 0) {
            res.json(result);  // Enviar los datos del empleado
        } else {
            res.status(404).send('Empleado no encontrado');  // Manejar el caso en que no se encuentre el empleado
        }
    });
});


app.get("/readCliente", (req, res) => {
    const sql = `
        SELECT persona.*, cliente.Puntos 
        FROM persona 
        INNER JOIN cliente 
        ON persona.ID_Persona = cliente.ID_Persona
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        
        // Enviar la respuesta con los datos combinados de persona y cliente
        return res.json(data);
    });
});

app.get('/readClientesCedula', (req, res) => { // Dada una cédula
    const { ID_Persona } = req.query; // Obtener la cédula desde los parámetros de la query
    console.log('Consultando datos del cliente con cédula:', ID_Persona);

    const sql = `
        SELECT p.ID_Persona, p.Nombres, p.Apellido1, p.Apellido2, p.FechaNac, p.Correo, p.Telefono, 
               c.Puntos
        FROM Persona p
        LEFT JOIN Cliente c ON p.ID_Persona = c.ID_Persona
        WHERE p.ID_Persona = ?
    `;

    db.query(sql, [ID_Persona], (err, result) => {
        if (err) {
            console.error('Error al consultar cliente:', err);
            return res.status(500).send('Error al consultar cliente');
        }

        if (result.length > 0) {
            res.json(result); // Enviar los datos del cliente
        } else {
            res.status(404).send('Cliente no encontrado'); // Manejar el caso en que no se encuentre el cliente
        }
    });
});

app.get("/readEmpleado", (req, res) => {
    const sql = `
        SELECT persona.*, empleado.Usuario, empleado.Tipo_Usuario 
        FROM persona 
        INNER JOIN empleado 
        ON persona.ID_Persona = empleado.ID_Persona
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        
        // Enviar la respuesta con los datos combinados de persona y empleado
        return res.json(data);
    });
});

app.get("/readPersona", (req, res) => {
    const sql = `
        SELECT persona.*, empleado.Usuario, empleado.Tipo_Usuario 
        FROM persona 
        INNER JOIN empleado 
        ON persona.ID_Persona = empleado.ID_Persona
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        
        // Enviar la respuesta con los datos combinados de persona y empleado
        return res.json(data);
    });
});


// Obtener datos de la tabla persona (todos los atributos excepto puntos)
app.get('/getPersona/:ID_Persona', (req, res) => {
    console.log(ID_Persona);
    const { ID_Persona } = req.params;
    const sql = "SELECT Nombres, Apellido1, Apellido2, FechaNac, Correo, Telefono, ID_Persona FROM persona WHERE ID_Persona = ?";  // Excluyendo Puntos

    db.query(sql, [ID_Persona], (err, result) => {
        if (err) return res.json({ error: 'Error obteniendo la persona' });
        return res.json(result[0]);
    });
});

// Obtener datos de la tabla clientes (solo puntos)
app.get('/getClientePuntos/:ID_Persona', (req, res) => {
    const { ID_Persona } = req.params;
    const sql = "SELECT Puntos FROM clientes WHERE ID_Persona = ?";  // Solo obteniendo puntos

    db.query(sql, [ID_Persona], (err, result) => {
        if (err) return res.json({ error: 'Error obteniendo los puntos' });
        return res.json(result[0]);
    });
});



app.get("/readProveedor",(req,res) =>{
    const sql = "SELECT * FROM proveedor";
    db.query(sql, (err,data) => {
        if (err) return app.json("Error");
        return res.json(data);
    })
})

app.get('/readCompra', (req, res) => {
    const { Cod_Factura } = req.query;

    // Consulta SQL para obtener el producto por su código
    const sql = 'SELECT * FROM factura_venta';

    db.query(sql, [Cod_Factura], (err, result) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json(result);
        }
    });
});

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

app.get('/Categoria/:categoria?', (req, res) => { // Nota el '?' al final del parámetro
    console.log("Backkkk");
    const categoria = req.params.categoria;
    console.log(categoria);

    let sql = "SELECT * FROM productos";
    const params = [];

    if (categoria && categoria !== 'All') {
        sql += " WHERE Categoria = ?";
        params.push(categoria);
    }

    db.query(sql, params, (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json("Error");
        }
        console.log(data);
        return res.json(data);
    });
});

app.get('/readEmpleadoCedula', (req, res) => {
    const { ID_Persona } = req.query;

    let sql = "SELECT * FROM Persona";
    const params = [];

    if (ID_Persona) {
        sql += " WHERE ID_Persona = ?";
        params.push(ID_Persona);
    }

    db.query(sql, params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error al obtener los empleado");
        }
        return res.json(data);
    });
});

app.put('/updateCliente/:ID_Persona', (req, res) => {
    const ID_Persona = req.params.ID_Persona;

    // Consulta SQL para actualizar la tabla persona
    const sqlPersona = "UPDATE `persona` SET `Nombres` = ?, `Apellido1` = ?, `Apellido2` = ?, `Correo` = ?, `Telefono` = ? WHERE `ID_Persona` = ?";
    
    const valuesPersona = [
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.Correo,
        req.body.Telefono
    ];

    // Ejecutar la primera consulta para actualizar persona
    db.query(sqlPersona, [...valuesPersona, ID_Persona], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error");
        }

        // Consulta SQL para actualizar la tabla cliente
        const sqlCliente = "UPDATE `cliente` SET `Puntos` = ? WHERE `ID_Persona` = ?";
        const valuesCliente = [
            req.body.Puntos
        ];

        // Ejecutar la segunda consulta para actualizar cliente
        db.query(sqlCliente, [...valuesCliente, ID_Persona], (err, data) => {
            if (err) {
                console.error(err); // Muestra el error en la consola
                return res.json("Error");
            }
            return res.json("data UPDATED SUCCESS");
        });
    });
});

app.put('/updateEmpleado/:ID_Persona', (req, res) => {
    const ID_Persona = req.params.ID_Persona;

    // Consulta SQL para actualizar la tabla persona
    const sqlPersona = "UPDATE `persona` SET `Nombres` = ?, `Apellido1` = ?, `Apellido2` = ?, `FechaNac` = ?, `Correo` = ?, `Telefono` = ? WHERE `ID_Persona` = ?";
    
    const valuesPersona = [
        req.body.Nombres,
        req.body.Apellido1,
        req.body.Apellido2,
        req.body.FechaNac,
        req.body.Correo,
        req.body.Telefono
    ];

    // Ejecutar la primera consulta para actualizar persona
    db.query(sqlPersona, [...valuesPersona, ID_Persona], (err, data) => {
        if (err) {
            console.error(err); // Muestra el error en la consola
            return res.json("Error updating persona");
        }

        // Consulta SQL para actualizar la tabla empleado
        const sqlEmpleado = "UPDATE `empleado` SET `Usuario` = ?, `Contraseña` = ?, `Tipo_Usuario` = ? WHERE `ID_Persona` = ?";
        const valuesEmpleado = [
            req.body.Usuario,
            req.body.Contraseña,
            req.body.Tipo_Usuario
        ];

        // Ejecutar la segunda consulta para actualizar empleado
        db.query(sqlEmpleado, [...valuesEmpleado, ID_Persona], (err, data) => {
            if (err) {
                console.error(err); // Muestra el error en la consola
                return res.json("Error updating empleado");
            }
            return res.json("Empleado updated successfully");
        });
    });
});


app.put('/ProductoUpdate/:Cod_Producto', (req, res) => {
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

app.put('/updateProveedor/:Cod_Proveedor', (req, res) => {
    const Cod_Proveedor = req.params.Cod_Proveedor;
    
    const sql = "UPDATE `proveedor` SET `Nombre_Proveedor` = ? where Cod_Proveedor = ?";
    const values = [
        req.body.Nombre_Proveedor
    ]
    
    db.query(sql, [...values, Cod_Proveedor], (err, data) => {
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

app.delete('/deleteEmpleado/:ID_Persona', (req, res) => {
    const ID_Persona = req.params.ID_Persona;
    console.log("ID_Persona to delete:", ID_Persona); // Verifica si el ID_Persona es correcto

    // Iniciar la transacción
    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return res.json("Transaction Error");
        }

        // Eliminar de la tabla cliente
        const sqlDeleteEmpleado = "DELETE FROM `empleado` WHERE ID_Persona = ?";
        db.query(sqlDeleteEmpleado, [ID_Persona], (err, data) => {
            if (err) {
                return db.rollback(() => {
                    console.error(err); // Muestra el error en la consola
                    return res.json("Error deleting from cliente");
                });
            }

            // Eliminar de la tabla persona
            const sqlDeletePersona = "DELETE FROM `persona` WHERE ID_Persona = ?";
            db.query(sqlDeletePersona, [ID_Persona], (err, data) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err); // Muestra el error en la consola
                        return res.json("Error deleting from persona");
                    });
                }

                // Confirmar la transacción
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error(err); // Muestra el error en la consola
                            return res.json("Transaction Commit Error");
                        });
                    }

                    return res.json("Data DELETED SUCCESS");
                });
            });
        });
    });
});

app.delete('/deleteCliente/:ID_Persona', (req, res) => {
    const ID_Persona = req.params.ID_Persona;
    console.log("ID_Persona to delete:", ID_Persona); // Verifica si el ID_Persona es correcto

    // Iniciar la transacción
    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return res.json("Transaction Error");
        }

        // Eliminar de la tabla cliente
        const sqlDeleteCliente = "DELETE FROM `cliente` WHERE ID_Persona = ?";
        db.query(sqlDeleteCliente, [ID_Persona], (err, data) => {
            if (err) {
                return db.rollback(() => {
                    console.error(err); // Muestra el error en la consola
                    return res.json("Error deleting from cliente");
                });
            }

            // Eliminar de la tabla persona
            const sqlDeletePersona = "DELETE FROM `persona` WHERE ID_Persona = ?";
            db.query(sqlDeletePersona, [ID_Persona], (err, data) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err); // Muestra el error en la consola
                        return res.json("Error deleting from persona");
                    });
                }

                // Confirmar la transacción
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error(err); // Muestra el error en la consola
                            return res.json("Transaction Commit Error");
                        });
                    }

                    return res.json("Data DELETED SUCCESS");
                });
            });
        });
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

app.delete('/deleteProveedor/:Cod_Proveedor', (req, res) => {
    const Cod_Proveedor = req.params.Cod_Proveedor;
    console.log("Cod_Proveedor to delete:", Cod_Proveedor); // Verifica si el Cod_Proveedor es correcto
    const sql = "DELETE FROM `proveedor` WHERE Cod_Proveedor = ?";
    db.query(sql, [Cod_Proveedor], (err, data) => {
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