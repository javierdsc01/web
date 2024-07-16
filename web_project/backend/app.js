const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3305; // Cambiado a un puerto diferente para evitar conflictos con MySQL

app.use(cors());
app.use(express.json());

// Creamos el objeto de la conexión
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'web_project',
    user: 'root',
    password: '',
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const insertQuery = 'INSERT INTO user (nombre, correo, contrasenna) VALUES (?, ?, ?)';

    // Realizar la inserción del nuevo usuario
    conexion.query(insertQuery, [username, email, password], function (error, results, fields) {
        if (error) {
            console.error('Error al insertar usuario:', error);
            res.status(500).json({ message: 'Error al insertar usuario' });
        } else {
            // Usuario registrado con éxito
            res.status(200).json({ message: 'Registro exitoso' });
        }
    });
});

app.post('/donate', (req, res) => {
    const { username, cantidad } = req.body;

    // Realizar la inserción de la nueva donación
    conexion.query('INSERT INTO donacion (id_user, dinero) VALUES ((SELECT id FROM user WHERE nombre = ?), ?)', [username, cantidad], function (error, results, fields) {
        if (error) {
            console.error('Error al insertar donación:', error);
            res.status(500).send('Error al insertar donación');
        } else {
            // Recuperar la cantidad total después de la inserción exitosa
            conexion.query('SELECT SUM(dinero) AS totalDonado FROM donacion', function (error, results, fields) {
                if (error) {
                    console.error('Error en la consulta después de la inserción:', error);
                    res.status(500).send('Error en la consulta después de la inserción');
                } else {
                    const totalDonado = results[0].totalDonado || 0;
                    res.json({ totalDonado });
                }
            });
        }
    });
});

app.post('/getUserId', (req, res) => {
    const { username } = req.body;
    const sql = `SELECT id FROM user WHERE nombre = ?`;

    // Realizar la búsqueda del id del usuario por su nombre
    conexion.query(sql, [username], function (error, resultsUser, fields) {
        if (error) {
            console.error('Error al buscar el id del usuario:', error);
            res.status(500).json({ userId: null });
            return;
        }

        console.log(sql);
        console.log('Resultado de la consulta:', resultsUser);

        // Verificar si se encontró el id del usuario
        if (resultsUser.length > 0 && resultsUser[0].id !== null && resultsUser[0].id !== undefined) {
            const userId = resultsUser[0].id;
            // Enviar el id del usuario al cliente
            res.json({ userId: userId });
        } else {
            console.error('No se encontró un ID de usuario válido:', username);
            res.status(500).json({ userId: null });
        }
    });
});

// Ruta para obtener información inicial
app.get('/informacion-inicial', (req, res) => {
    // Realizar consultas necesarias para obtener la información inicial
    conexion.query('SELECT SUM(dinero) AS totalDonado FROM donacion', function (error, resultsDonacion, fields) {
        if (error) {
            console.error('Error al obtener información inicial:', error);
            res.status(500).send('Error al obtener información inicial');
            return;
        }

        // Obtener el número de aportaciones (filas) en la tabla donacion
        conexion.query('SELECT COUNT(*) AS donationTotal FROM donacion', function (error, resultsCount, fields) {
            if (error) {
                console.error('Error al obtener el número de aportaciones:', error);
                res.status(500).send('Error al obtener información inicial');
                return;
            }

            const totalDonado = resultsDonacion[0].totalDonado || 0;
            const donationTotal = resultsCount[0].donationTotal || 0;

            const amountLeft = 15000 - totalDonado;
            const amountTotal = totalDonado;

            res.json({ totalDonado, amountLeft, amountTotal, donationTotal });
        });
    });
});



app.post('/login', (req, res) => {
    const username = req.body.user_username;
    const password = req.body.user_password;
  
    // Consulta SQL para verificar el inicio de sesión
    const sql = `SELECT * FROM user WHERE nombre = ? AND contrasenna = ?`;
  
    // Ejecutar la consulta
    conexion.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ success: false, message: 'Error en la consulta' });
      } else {
        // Verificar si se encontraron coincidencias
        if (result.length > 0) {
          res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
          res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
      }
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
