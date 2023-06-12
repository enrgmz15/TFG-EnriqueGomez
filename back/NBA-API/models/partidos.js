import mongoose from 'mongoose';
let user='root';
let pass='root';

mongoose.connect(`mongodb://${user}:${pass}@localhost:27017/NBA?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

let Partidos = new mongoose.Schema({
    codigo : Number,
    equipo_local: String,
    equipo_visitante : String,
    puntos_local : Number,
    puntos_visitante : Number,
    temporada : String
});

let games = mongoose.model('partidos', Partidos);

export async function getJugadores(){
    let res = await games.find().select('equipo_local puntos_local equipos_visitante puntos_visitante');
    if (res) {
        let llista = [];
        for (let partido of res) {
            llista.push(partido);
        }

        return llista;
    } else {
        console.log(err);
        return null;
    }
}

export async function QualiPorTemporada(temporada, conferencia){
    let res = await games.aggregate([
        {
          $match: {
            "temporada": temporada
          }
        },
        {
          $project: {
            equipo_local: 1,
            puntos_local: 1,
            equipo_visitante: 1,
            puntos_visitante: 1,
            victoria_local: {
              $cond: [
                { $gt: ["$puntos_local", "$puntos_visitante"] },
                1,
                0
              ]
            },
            victoria_visitante: {
              $cond: [
                { $gt: ["$puntos_visitante", "$puntos_local"] },
                1,
                0
              ]
            }
          }
        },
        {
          $group: {
            _id: "$equipo_local",
            victorias: {
              $sum: "$victoria_local"
            },
            derrotas: {
              $sum: "$victoria_visitante"
            }
          }
        },
        {
          $lookup: {
            from: "equipos",
            localField: "_id",
            foreignField: "Nombre",
            as: "equipo"
          }
        },
        {
          $unwind: "$equipo"
        },
        {
          $project: {
            _id: 0,
            equipo: "$equipo.Nombre",
            conferencia : "$equipo.Conferencia",
            victorias: 1,
            derrotas: 1
          }
        },
        {
          $match: {
             conferencia: conferencia
          }
        },      
        {
          $sort: {
            victorias: -1
          }
        }
      ]);
    if (res) {
        let llista = [];
        for(let equipo of res){
          
          llista.push(equipo);
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }
}