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
                          content:Container(
                            width: 300,
                            padding: EdgeInsets.all(16),
                             child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(jugador['Nombre'], textAlign: TextAlign.center,
                                style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                ),),
                                SizedBox(height: 16),
                                Text('Puntos por Partido: '+stats[0]['Puntos_por_partido'].toString()),
                                Text('Rebotes por Partido: '+stats[0]['Rebotes_por_partido'].toString()),
                                Text('Asistencias por Partido: '+stats[0]["Asistencias_por_partido"].toString()),
                                Text('Tapones por Partido: '+stats[0]['Tapones_por_partido'].toString()),
                              ],
                             )
                          )
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
