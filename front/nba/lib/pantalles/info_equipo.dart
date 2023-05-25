/*import 'package:flutter/material.dart';
import 'package:nba/rutes.dart';

class InfoEquipo extends StatefulWidget{
  const InfoEquipo({required this.temporada, required this.equipo , required this.ciudad,super.key});

  final String temporada;
  final String equipo;
  final String ciudad;

  @override
  State<InfoEquipo> createState() => _InfoEquipoState();
}

class _InfoEquipoState extends State<InfoEquipo>{
  late Future<dynamic> __listaJugadores;

  @override
  void initState() {
    __listaJugadores= JugadoresPorEquipo(widget.equipo);
    super.initState();  
  }


    @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        centerTitle: true,
        title: Text(widget.ciudad+" "+widget.equipo),
        actions: [new Image(image: AssetImage("../../assets/${widget.equipo}.png"))],
      ),
      body: FutureBuilder<dynamic>(
        future: __listaJugadores,
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          } else {
            // Ejemplo: 
            final jugadores = snapshot.data;
            return ListView.builder(
              itemCount: jugadores.length,
              itemBuilder: (BuildContext context, int index) {
                final jugador = jugadores[index];
                return GestureDetector(
                  /*onTap: (() {
                    Navigator.push(
                      //pass;
                    );
                    }),*/
                  child: ListTile(
                  title: Text(jugador['Nombre']),
                  trailing: Text(jugador['Posicion'],
                    style: TextStyle(fontSize: 18)),
                  ),
                );
              },
             );
          }
        },
      ),
    );
  }
}*/
import 'package:flutter/material.dart';
import 'package:nba/rutes.dart';

class InfoEquipo extends StatefulWidget{
  const InfoEquipo({required this.temporada, required this.equipo , required this.ciudad,super.key});

  final String temporada;
  final String equipo;
  final String ciudad;

  @override
  State<InfoEquipo> createState() => _InfoEquipoState();
}
class _InfoEquipoState extends State<InfoEquipo>{
  late Future<dynamic> __listaJugadores;

  @override
  void initState() {
    __listaJugadores= JugadoresPorEquipo(widget.equipo);
    super.initState();  
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        centerTitle: true,
        title: Text(widget.ciudad+" "+widget.equipo),
        actions: [new Image(image: AssetImage("../../assets/${widget.equipo}.png"))],
      ),
      body: FutureBuilder<dynamic>(
        future: __listaJugadores,
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          } else {
            final jugadores = snapshot.data;
            return ListView.builder(
              itemCount: jugadores.length,
              itemBuilder: (BuildContext context, int index) {
                final jugador = jugadores[index];
                return GestureDetector(
                  onTap: () async {
                    dynamic stats = await StatsporJugador(jugador['codigo'].toString(), widget.temporada);
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Estadísticas de ${jugador['Nombre']}'),
                          content: Column(
                            children: [
                              Text(stats["Puntos_por_partido"]),
                              Text(stats["Asistencias_por_partido"]),
                            ],
                          ),
                          actions: [
                            TextButton(
                              child: Text('Cerrar'),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ),
                          ],
                        );
                      },
                    );
                  },
                  child: ListTile(
                    title: Text(jugador['Nombre']),
                    trailing: Text(
                      jugador['Posicion'],
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
