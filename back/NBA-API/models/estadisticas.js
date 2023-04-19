import mongoose from 'mongoose';
const players = require('./jugadores.js'); 

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

let juga = mongoose.model('players', players);

let stats = mongoose.model('estadisticas', Estadisticas);

export async function getMaximosAnotadores(codigo, temporada){
    let res1= await stats.find({"temporada":temporada},{Puntos_por_partido:1,jugador:1,_id:0});
    let res2= await juga.find({"codigo":codigo},{Nombre:1,codigo:1,_id:0});

    if (res) {
        let llista = [];
        for (let stat of res1) {
            for(let nombre of res2){
                llista.push([nombre["Nombre"],stat["Puntos_por_partido"]]);
            }
        }
    }

}
