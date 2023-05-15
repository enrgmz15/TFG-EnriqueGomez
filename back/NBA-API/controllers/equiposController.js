import { getEquipos, getEquiposPorConferencia } from '../models/equipos.js';


export default class EquiposController{
    static async NombresEquipos(req,res){
        let response;
        let type = "application/json";
        let status;
        console.log(req.query);
        if(typeof(req.params.nombre) === typeof(undefined) &&
        typeof(req.query.nombre) === typeof(undefined)) {

            let llista = await getEquipos();
            response = { llista };
            status = 200;
        }else{
            let nombre;
            if(typeof(req.params.nombre) !== typeof(undefined)) nombre = req.params.nombre;
            else nombre = req.query.nombre;

            response=null;
            if (!response) response = { "status": "error", "msg": "User not Found" };
        }

        res.type = type;
        res.status = status;
        res.send(response);
    }
    static async ObtenerEquiposPorConferencia(req,res){
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.conferencia) === typeof(undefined) &&
        typeof(req.query.conferencia) === typeof(undefined)) {

            let llista =  await getEquipos();
            response = { "status": "ok", "data": llista };
            status = 200;
        }else{
            let conferencia;
            if(typeof(req.params.conferencia) !== typeof(undefined)) conferencia = req.params.conferencia;
            else conferencia = req.query.conferencia;

            response = await getEquiposPorConferencia(conferencia);
            if (!response) response = { "status": "error", "msg": "Not Found" };
        }

        res.type = type;
        res.status = status;
        res.send(response);
}
}
