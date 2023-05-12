import express from 'express';
import cors from 'cors';

import equiposController from './controllers/equiposController.js';
import jugadoresController from './controllers/jugadoresController.js';
import estadisticasController from './controllers/estadisticasController.js';

import bodyParser from 'body-parser';
import partidosController from './controllers/partidosControllers.js';
const { urlencoded, json } = bodyParser;

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.listen(8080, () => {
    console.log('Escuchando por el puerto 8080')
});

function DefaultController(req,res){
    res.send("Error 404");
}

const router = express.Router();

router.get('/equipos',equiposController.NombresEquipos);

router.get('/:equipo/jugadores', jugadoresController.ObtenerJugadoresPorEquipo);

router.get('/:conferencia/equipos',equiposController.ObtenerEquiposPorConferencia);

router.get('/anotadores',estadisticasController.ObtenerPPP);

router.get('/asistentes',estadisticasController.ObtenerAPP);

router.get('/reboteadores',estadisticasController.ObtenerRPP);

router.get('/taponadores',estadisticasController.ObtenerTPP);

router.get('/:conferencia/clasificacion',partidosController.EquiposClasificacion);

router.get('/stats/:codigo', estadisticasController.StatsJugador);

app.use("/api", router);

app.use('*', DefaultController);