import { getEquipos } from '../models/equipos.js';


export default class usuariosController{
    static async NombresEquipos(req,res){
        let lista = []
        let response;
        let type = "application/json";
        let status;

        if(typeof(req.params.nombre) === typeof(undefined) &&
        typeof(req.query.nombre) === typeof(undefined)) {

            let llista = await getEquipos();
            response = { "status": "ok", "data": llista };
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
}