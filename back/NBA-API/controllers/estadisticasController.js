import {getMaximosAnotadores, getMaximosAsistentes, getMaximosReboteadores, getMaximosTaponadores, statsPorJugador} from '../models/estadisticas.js';


export default class estadisticasController{


    static async StatsJugador(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.codigo) === typeof(undefined) &&
        typeof(req.query.codigo) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { llista };
            status = 200;
        }else{
            let temporada;
            let codigo;
            if(typeof(req.query.temporada) !== typeof(undefined)  && typeof(req.params.codigo) !== typeof(undefined)) {
            temporada = req.query.temporada;
            codigo = req.params.codigo;
            }
            else{

            } 
            

            response= await statsPorJugador(temporada,codigo);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }

    static async ObtenerPPP(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { llista };
            status = 200;
        }else{
            let temporada;
            if(typeof(req.query.temporada) !== typeof(undefined)) {
            temporada = req.query.temporada;
            }
            else{
                temporada = req.query.temporada;
            }             

            response=  await getMaximosAnotadores(temporada);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }

    static async ObtenerAPP(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { llista };
            status = 200;
        }else{
            let temporada;
            if(typeof(req.query.temporada) !== typeof(undefined)) {
            temporada = req.query.temporada;
            }
            else{
                temporada = req.query.temporada;
            }             

            response=  await getMaximosAsistentes(temporada);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
    static async ObtenerRPP(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { llista };
            status = 200;
        }else{
            let temporada;
            if(typeof(req.query.temporada) !== typeof(undefined)) {
            temporada = req.query.temporada;
            }
            else{
                temporada = req.query.temporada;
            }             

            response=  await getMaximosReboteadores(temporada);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
    static async ObtenerTPP(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { llista };
            status = 200;
        }else{
            let temporada;
            if(typeof(req.query.temporada) !== typeof(undefined)) {
            temporada = req.query.temporada;
            }
            else{
                temporada = req.query.temporada;
            }             

            response=  await getMaximosTaponadores(temporada);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
}