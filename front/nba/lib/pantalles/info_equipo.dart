import 'package:flutter/material.dart';
import 'package:nba/rutes.dart';

class InfoEquipo extends StatefulWidget{
  const InfoEquipo({required this.temporada, required this.equipo , super.key});

  final String temporada;
  final String equipo;

  @override
  State<InfoEquipo> createState() => _InfoEquipoState();
}

class _InfoEquipoState extends State<InfoEquipo>{
  late Future<dynamic> __listaJugadores;

  @override
  void initState() {
    __listaJugadores= JugadoresPorEquipo(widget.temporada);
    super.initState();  
  }

    @override
  Widget build(BuildContext context) {
    return Scaffold(
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
            final List jugadores = snapshot.data["llista"];
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
                  trailing: Text(jugador['Posicion']),
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