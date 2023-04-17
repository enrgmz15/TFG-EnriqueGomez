db.getCollection("partidos").find({$and:[{equipo_local:"Heat",temporada:"05/06",$expr:{$gt:["$puntos_local" , "$puntos_visitante"]}}]}).count();
db.getCollection("partidos").find({$and:[{equipo_visitante:"Heat",temporada:"05/06",$expr:{$gt:["$puntos_visitante" , "$puntos_local"]}}]}).count();

db.getCollection("partidos").find({$and:[{equipo_local:"Heat",temporada:"05/06"}]}).count();
db.getCollection("partidos").find({$and:[{equipo_visitante:"Heat",temporada:"05/06"}]}).count();

db.getCollection("partidos").find({});
db.getCollection("jugadores").find({equipo:});