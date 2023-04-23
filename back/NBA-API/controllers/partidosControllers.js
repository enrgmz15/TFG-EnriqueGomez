import { QualiPorTemporada } from "../models/partidos.js";

export default class partidosController{
    static async EquiposClasificacion(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined)&& typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined)) {

            let llista =  await getPartidos();
            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            if(typeof(req.params.temporada) !== typeof(undefined) && typeof(req.params.temporada2) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
            } 
            

            response= await QualiPorTemporada(temporada,temporada2);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
}