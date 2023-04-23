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
let juga=mongoose.model('jugadores',Jugadores);

export async function getMaximosAnotadores(temporada,temporada2){
  let temp= temporada+'/'+temporada2;
  let res = await juga.aggregate([
      {
        "$lookup": {
          "from": "estadisticas",
          "localField": "codigo",
          "foreignField": "jugador",
          "as": "puntos"
        }
      },
      {
        "$match": {
          "puntos.temporada": temp
        }
      },
      {
        "$project": {
          "Nombre": 1,
          "puntos.Puntos_por_partido": 1,
          _id: 0
        }
      },
      {
        "$sort": {
          "puntos.Puntos_por_partido": -1
        }
      }
    ]);
    /*let res = await stats.aggregate([
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
        },
        {$sort : {puntosPorPartido:-1}}
      ]);*/

    if (res) {
        let llista = [];
        for(let jugador of res){
          
          llista.push(jugador);
        }
        console.log(llista);
    } else {
        console.log(err);
        return null;
    }

}
