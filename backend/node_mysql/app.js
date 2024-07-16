let mysql = require ("mysql")

// Creamos el objeto de la conexión
let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: '',
});

// Creamos la conexión y vemos si hay errores o se conecta sin problema
conexion.connect (function(error){
    if(error){
        throw error;
    } else {
        console.log('Success!')
    }
});

conexion.query('SELECT * from registration', function(error, results, fields){
    if(error)
    throw(error);

    results.forEach(result => {
        console.log(result)
    });
});

conexion.end