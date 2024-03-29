import mongoose from 'mongoose';
import Jugadores from './jugadores.js';
let user='root';
let pass='root';

mongoose.connect(`mongodb://${user}:${pass}@localhost:27017/NBA?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
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

export async function getEstadisticas(){
  let res= await stats.find().select('jugador');
  if (res) {
      let llista = [];
      for (let stat of res) {
          llista.push(stat);
      }

      return llista;
  } else {
      console.log(err);
      return null;
  }
}

export async function statsPorJugador(temporada,codigo){
  let res = await stats.find({jugador: parseInt(codigo), temporada: temporada}).select('-jugador -temporada -_id');
  if(res){
    let llista=[]
    for(let stat of res){
      llista.push(stat);
    }
    return llista;
  }else{
    console.log(err);
    return null;
  }
}

export async function getMaximosAnotadores(temporada){
  let res = await juga.aggregate([
    {
      $lookup: {
        from: "estadisticas",
        localField: "codigo",
        foreignField: "jugador",
        as: "estadisticas"
      }
    },
    {
      $match: {
        "estadisticas.temporada": temporada
      }
    },
    {
      $unwind: "$estadisticas"
    },
    {
      $sort: {
        "estadisticas.Puntos_por_partido": -1
      }
    },
    {
      $project: {
        _id: 0,
        Nombre: 1,
        Puntos_por_partido: "$estadisticas.Puntos_por_partido",
        Temporada: "$estadisticas.temporada"
      }
    }
  ]
  );
    if (res) {
        let llista = [];
        for(let jugador of res){
          if(jugador["Temporada"]===temporada){
          llista.push(jugador);}
          if(llista.length==15){
            break;
          }
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }

}
export async function getMaximosAsistentes(temporada){
  let res = await juga.aggregate([
    {
      $lookup: {
        from: "estadisticas",
        localField: "codigo",
        foreignField: "jugador",
        as: "estadisticas"
      }
    },
    {
      $match: {
        "estadisticas.temporada": temporada
      }
    },
    {
      $unwind: "$estadisticas"
    },
    {
      $sort: {
        "estadisticas.Asistencias_por_partido": -1
      }
    },
    {
      $project: {
        _id: 0,
        Nombre: 1,
        Asistencias_por_partido: "$estadisticas.Asistencias_por_partido",
        Temporada: "$estadisticas.temporada"
      }
    }
  ]
  );
    if (res) {
        let llista = [];
        for(let jugador of res){
          if(jugador["Temporada"]===temporada){
          llista.push(jugador);}
          if(llista.length==15){
            break;
          }
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }

}
export async function getMaximosReboteadores(temporada){
  let res = await juga.aggregate([
    {
      $lookup: {
        from: "estadisticas",
        localField: "codigo",
        foreignField: "jugador",
        as: "estadisticas"
      }
    },
    {
      $match: {
        "estadisticas.temporada": temporada
      }
    },
    {
      $unwind: "$estadisticas"
    },
    {
      $sort: {
        "estadisticas.Rebotes_por_partido": -1
      }
    },
    {
      $project: {
        _id: 0,
        Nombre: 1,
        Rebotes_por_partido: "$estadisticas.Rebotes_por_partido",
        Temporada: "$estadisticas.temporada"
      }
    }
  ]
  );
    if (res) {
        let llista = [];
        for(let jugador of res){
          if(jugador["Temporada"]===temporada){
          llista.push(jugador);}
          if(llista.length==15){
            break;
          }
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }

}
export async function getMaximosTaponadores(temporada){
  let res = await juga.aggregate([
    {
      $lookup: {
        from: "estadisticas",
        localField: "codigo",
        foreignField: "jugador",
        as: "estadisticas"
      }
    },
    {
      $match: {
        "estadisticas.temporada": temporada
      }
    },
    {
      $unwind: "$estadisticas"
    },
    {
      $sort: {
        "estadisticas.Tapones_por_partido": -1
      }
    },
    {
      $project: {
        _id: 0,
        Nombre: 1,
        Tapones_por_partido: "$estadisticas.Tapones_por_partido",
        Temporada: "$estadisticas.temporada"
      }
    }
  ]
  );
    if (res) {
        let llista = [];
        for(let jugador of res){
          if(jugador["Temporada"]===temporada){
          llista.push(jugador);}
          if(llista.length==15){
            break;
          }
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }

}
