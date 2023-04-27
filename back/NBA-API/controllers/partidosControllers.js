import { QualiPorTemporada } from "../models/partidos.js";

export default class partidosController{
    static async EquiposClasificacion(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined) && typeof(req.params.conferencia) === typeof(undefined) &&
        typeof(req.query.conferencia) === typeof(undefined)) {

            let llista =  await getPartidos();
            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            let conferencia
            if(typeof(req.params.temporada) !== typeof(undefined)  && typeof(req.params.temporada2) !== typeof(undefined) && typeof(req.params.conferencia) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            conferencia = req.params.conferencia;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
                conferencia = req.query.conferencia;
            } 
            

            response= await QualiPorTemporada(temporada,temporada2,conferencia);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
}