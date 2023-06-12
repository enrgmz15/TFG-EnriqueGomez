import mongoose from 'mongoose';
let user='root';
let pass='root';

mongoose.connect(`mongodb://${user}:${pass}@localhost:27017/NBA?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

let Jugadores = new mongoose.Schema({
    codigo : Number,
    Nombre : String,
    Procedencia : String,
    Altura : String,
    Peso : Number,
    Nombre_equipo : String
});
export default Jugadores;

let players = mongoose.model('jugadores', Jugadores);

export async function getJugadores(){
    let res = await players.find().select('Nombre');
    if (res) {
        let llista = [];
        for (let jugador of res) {
            llista.push(jugador["Nombre"]);
        }

        return llista;
    } else {
        console.log(err);
        return null;
    }
}


export async function getJugadoresPorEquipo(equipo){
    let res= await players.find({'Nombre_equipo': equipo},{codigo:1,Nombre:1, Posicion:1, _id:0});
    if (res) {
        let llista = [];
        for (let jugador of res) {
            llista.push(jugador);
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }


}


