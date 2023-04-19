import mongoose from 'mongoose';
import Jugadores from './jugadores.js';

mongoose.connect('mongodb://root:root@localhost:27017/NBA?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

let Estadisticas = new mongoose.Schema({
    temporada : String,
    jugador : Number,
    Puntos_por_partido : Number,
    Asistencias_por_partido : Number,
    Tapones_por_partido : Number,
    Rebotes_por_partido : Number
});

let stats = mongoose.model('estadisticas', Estadisticas);

export async function getMaximosAnotadores(codigo, temporada){
    //let res1= await stats.find({"temporada":temporada},{Puntos_por_partido:1,jugador:1,_id:0});
    //let res2= await juga.find({"codigo":codigo},{Nombre:1,codigo:1,_id:0});
    let res = await stats.aggregate([
        {
          $match: { 'temporada': temporada } // Filtrar por la temporada deseada
        },
        {
          $lookup: { // Unir con la colección de jugadores para obtener su nombre
            from: "jugadores",
            localField: "jugador",
            foreignField: "codigo",
            as: "jugador"
          }
        },
        {
          $unwind: "$jugador" // Desagregar el campo jugador
        },
        {
          $project: { // Seleccionar los campos deseados
            _id: 0,
            nombre: "$jugador.Nombre",
            puntosPorPartido: "$Puntos_por_partido"
          }
        }
      ]);

    if (res) {
        let llista = [];
        
    } else {
        console.log(err);
        return null;
    }

}
