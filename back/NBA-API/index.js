const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'alumne',
  password: 'alumne',
  database: 'NBA'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.listen(8080, () => {
    console.log('Escuchando por el puerto 8080')
});

function DefaultController(req,res){
    res.send("Error 404");
}