import mongoose from 'mongoose';
let user='root';
let pass='root';

mongoose.connect(`mongodb://${user}:${pass}@localhost:27017/NBA?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

let Equipos = new mongoose.Schema({
    Nombre : String,
    Ciudad : String,
    Conferencia : String,
    Division : String
});
let eqps = mongoose.model('equipos', Equipos);  

export async function getEquipos(){
    let res= await eqps.find({},{Nombre:1,Ciudad:1,_id:0});
    if (res) {
        let llista = [];
        for (let equipo of res) {
            llista.push(equipo);
        }

        return llista;
    } else {
        console.log(err);
        return null;
    }
}

export async function getEquiposPorConferencia(conferencia){
    let res= await eqps.find({'Conferencia': conferencia},{Nombre:1,_id:0});
    if (res) {
        let llista = [];
        for (let equipo of res) {
            llista.push(equipo);
        }
        return llista;
    } else {
        console.log(err);
        return null;
    }
}
