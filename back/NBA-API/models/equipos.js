import mongoose from 'mongoose';

mongoose.connect('mongodb://root:root@localhost:27017/NBA?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

let Equipos = new mongoose.Schema({
    Nombre : String,
    Ciudad : String,
    Conferencia : String,
    Division : String
});
let eqps = mongoose.model('equipos', Equipos);  

export async function getEquipos(){
    let res= await eqps.find().select('Nombre');
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
