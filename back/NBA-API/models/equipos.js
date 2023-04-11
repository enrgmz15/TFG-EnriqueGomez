import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/NBA');
mongoose.connection.on("error", function(e) { console.error(e); });

let Equipos = new mongoose.Schema({
    Nombre : String,
    Ciudad : String,
    Conferencia : String,
    Division : String
});

let eqps = mongoose.model('equipos', Equipos);

export async function getEquipos(){
    let res= await eqps.find({ Nombre: 1, _id:0});
    if (res) {
        let llista = [];
        for (let equipo of res) {
            llista.push(equipo["Nombre"]);
        }

        return llista;
    } else {
        console.log(err);
        return null;
    }
}
