import express from 'express';

import equiposController from './controllers/equiposController.js';
import jugadorsController from './controllers/jugadorsController.js';

import bodyParser from 'body-parser';
import JugadorsController from './controllers/jugadorsController.js';
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

const router = express.Router();

router.get('/equipos',equiposController.NombresEquipos);

router.get('/:equipo?/jugadores',jugadorsController.ObtenerJugadoresPorEquipo)

app.use("/api", router);

app.use('*', DefaultController);