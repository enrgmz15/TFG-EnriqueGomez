import {getMaximosAnotadores, getMaximosAsistentes, getMaximosReboteadores, getMaximosTaponadores, statsPorJugador} from '../models/estadisticas.js';


export default class estadisticasController{


    static async StatsJugador(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.temporada) === typeof(undefined) &&
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined) && typeof(req.params.codigo) === typeof(undefined) &&
        typeof(req.query.codigo) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            let codigo;
            if(typeof(req.params.temporada) !== typeof(undefined)  && typeof(req.params.temporada2) !== typeof(undefined) && typeof(req.params.codigo) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            codigo = req.params.codigo;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
                codigo = req.query.codigo;
            } 
            

            response= await statsPorJugador(temporada,temporada2,codigo);
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
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            if(typeof(req.params.temporada) !== typeof(undefined)  && typeof(req.params.temporada2) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
            }             

            response=  await getMaximosAnotadores(temporada,temporada2);
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
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            if(typeof(req.params.temporada) !== typeof(undefined)  && typeof(req.params.temporada2) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
            }             

            response=  await getMaximosAsistentes(temporada,temporada2);
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
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            if(typeof(req.params.temporada) !== typeof(undefined)  && typeof(req.params.temporada2) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
            }             

            response=  await getMaximosReboteadores(temporada,temporada2);
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
        typeof(req.query.temporada) === typeof(undefined) && typeof(req.params.temporada2) === typeof(undefined) &&
        typeof(req.query.temporada2) === typeof(undefined)) {
            
            let llista =  await getEstadisticas();

            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let temporada;
            let temporada2;
            if(typeof(req.params.temporada) !== typeof(undefined)  && typeof(req.params.temporada2) !== typeof(undefined)) {
            temporada = req.params.temporada;
            temporada2 = req.params.temporada2;
            }
            else{
                temporada = req.query.temporada;
                temporada2 = req.query.temporada2;
            }             

            response=  await getMaximosTaponadores(temporada,temporada2);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }
        
        res.type = type;
        res.status = status;
        res.send(response);
    }
}