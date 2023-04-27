import express from 'express';

import equiposController from './controllers/equiposController.js';
import jugadoresController from './controllers/jugadoresController.js';
import estadisticasController from './controllers/estadisticasController.js';

import bodyParser from 'body-parser';
import partidosController from './controllers/partidosControllers.js';
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

router.get('/:equipo?/jugadores', jugadoresController.ObtenerJugadoresPorEquipo);

router.get('/:conferencia?/equipos',equiposController.ObtenerEquiposPorConferencia);

router.get('/:temporada?/:temporada2?/anotadores',estadisticasController.ObtenerPPP);

router.get('/:temporada?/:temporada2?/asistentes',estadisticasController.ObtenerAPP);

router.get('/:temporada?/:temporada2?/reboteadores',estadisticasController.ObtenerRPP);

router.get('/:temporada?/:temporada2?/taponadores',estadisticasController.ObtenerTPP);

router.get('/:temporada?/:temporada2?/:conferencia/clasificacion',partidosController.EquiposClasificacion);

router.get('/stats/:temporada?/:temporada2?/:codigo?', estadisticasController.StatsJugador);

app.use("/api", router);

app.use('*', DefaultController);