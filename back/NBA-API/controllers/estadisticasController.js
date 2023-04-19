import {getMaximosAnotadores} from '../models/estadisticas.js';

export default class estadisticasController{
    static async ObtenerPPP(req,res){
        console.log(getMaximosAnotadores());
    }
}