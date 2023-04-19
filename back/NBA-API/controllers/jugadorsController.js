import { getJugadoresPorEquipo } from "../models/jugadores.js";

export default class JugadorsController {

    static async ObtenerJugadoresPorEquipo(req,res){
        let lista = []
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.equipo) === typeof(undefined) &&
        typeof(req.query.equipo) === typeof(undefined)) {

            let llista =  await getJugadores();
            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let equipo;
            if(typeof(req.params.equipo) !== typeof(undefined)) equipo = req.params.equipo;
            else equipo = req.query.equipo;

            response = await getJugadoresPorEquipo(equipo);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }

        res.type = type;
        res.status = status;
        res.send(response);
    }
}