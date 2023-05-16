import { QualiPorTemporada } from "../models/partidos.js";

export default class partidosController{
    static async EquiposClasificacion(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined)&& typeof(req.params.conferencia) === typeof(undefined) &&
        typeof(req.query.conferencia) === typeof(undefined)) {

            let llista =  await getPartidos();
            response = { llista };
            status = 200;
        }else{
            let temporada;
            let conferencia
            if(typeof(req.query.temporada) !== typeof(undefined) && typeof(req.params.conferencia) !== typeof(undefined)) {
            temporada = req.query.temporada;
            conferencia = req.params.conferencia;
            }
            else{
                temporada = req.query.temporada;
                conferencia = req.query.conferencia;
            } 
            

            response= await QualiPorTemporada(temporada,conferencia);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
}