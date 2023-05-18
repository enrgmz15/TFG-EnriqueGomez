import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nba/pantalles/info_equipo.dart';
import 'package:nba/rutes.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({required this.temporada, required this.conferencia, super.key});

  final String temporada;
  final String conferencia;


  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  late Future<dynamic> _listaClasificacion;
  int _selectedIndex = 0;

  @override
  void initState(){
    _listaClasificacion= ClasiConferencia(widget.temporada,widget.conferencia);
    super.initState();
  }

  static List<Widget> _widgetOptions(String temporada) {
    return <Widget>[
      ClasificacionPage(temporada: temporada),
      EquiposPage(temporada: temporada),
      LideresPage(temporada: temporada),
    ];
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.red,
          centerTitle: true,
          title: Text("Temporada "+widget.temporada, textAlign: TextAlign.center),
        ),
        body: Center(
          child: _widgetOptions(widget.temporada).elementAt(_selectedIndex),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.format_list_numbered),
              label: 'Clasificacion',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.shield_outlined),
              label: 'Equipos',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.equalizer),
              label: 'Lideres',
            ),
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: Colors.amber[800],
          onTap: _onItemTapped,
        ),
      );
  }
}

class ClasificacionPage extends StatefulWidget {
  const ClasificacionPage({Key? key,required this.temporada}) : super(key: key);

  final String temporada;

  @override
  State<ClasificacionPage> createState() => _ClasificacionPageState();
}

class _ClasificacionPageState extends State<ClasificacionPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late Future<dynamic> _eastClasificacion;
  late Future<dynamic> _westClasificacion;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _eastClasificacion = ClasiConferencia(widget.temporada, "East");
    _westClasificacion = ClasiConferencia(widget.temporada, "West");
  }

  @override
  Widget build(BuildContext context) {
     return Scaffold(
      body: Column(
              children: <Widget>[
                TabBar(
                  indicatorColor: Colors.red,
                  controller: _tabController,
                  labelColor: Colors.red,
                  tabs: [
                    Tab(text: 'East'),
                    Tab(text: 'West'),
                  ],
                ),
                Expanded(
                  child: TabBarView(
                    controller: _tabController,
                    children: [
                      FutureBuilder<dynamic>(
                  future: _eastClasificacion,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(
                        child: CircularProgressIndicator(),
                      );
                    } else if (snapshot.hasError) {
                      return Center(
                        child: Text('Error: ${snapshot.error}'),
                      );
                    } else {
                      final List clasificacion=snapshot.data;
                      return ListView.builder(
                        itemCount: clasificacion.length,
                        itemBuilder: (context, index) {
                          final equipo = clasificacion[index];
                          var pos=index+1;
                          return ListTile(
                            leading: Text(pos.toString()),
                            title: Text(equipo['equipo']),
                            trailing: Text("${equipo['victorias']} - ${equipo['derrotas']}"),
                          );
                        },
                      );
                    }
                  },
                ),
                       FutureBuilder<dynamic>(
                  future: _westClasificacion,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(
                        child: CircularProgressIndicator(),
                      );
                    } else if (snapshot.hasError) {
                      return Center(
                        child: Text('Error: ${snapshot.error}'),
                      );
                    } else {
                      final List clasificacion=snapshot.data;
                      return ListView.builder(
                        itemCount: clasificacion.length,
                        itemBuilder: (context, index) {
                          final equipo = clasificacion[index];
                          var pos=index+1;
                          return ListTile(
                            leading: Text(pos.toString()),
                            title: Text(equipo['equipo']),
                            trailing: Text("${equipo['victorias']} - ${equipo['derrotas']}"),
                          );
                        },
                      );
                    }
                  },
                ),
                    ],
                  ),
                ),
              ],
            ));
  }
  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
}

class EquiposPage extends StatefulWidget {
  const EquiposPage({Key? key,required this.temporada}) : super(key: key);

  final String temporada;

  @override
  _EquiposPageState createState() => _EquiposPageState();
}

class _EquiposPageState extends State<EquiposPage> {  
  late Future<dynamic> _listaEquipos;

  void _toInfoEquipo(String equipo, String ciudad){
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) =>InfoEquipo(temporada: widget.temporada, equipo: equipo ,ciudad : ciudad)
        )
        );
  }

  @override
  void initState() {
    _listaEquipos = Equipos();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<dynamic>(
        future: _listaEquipos,
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
            final List equipos = snapshot.data["llista"];
            return ListView.builder(
              itemCount: equipos.length,
              itemBuilder: (BuildContext context, int index) {
                final equipo = equipos[index];
                var nombre=equipo['Nombre'];
                var ciudad = equipo['Ciudad'];
                return GestureDetector(
                  onTap: (() {
                    _toInfoEquipo(nombre, ciudad);
                    }
                    ),
                  child: ListTile(
                  leading : new Image(image: new AssetImage("../../assets/${nombre}.png")),
                  title: Text(ciudad+" "+nombre),
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


class LideresPage extends StatefulWidget {
  const LideresPage({Key? key,required this.temporada}) : super(key: key);

  final String temporada;

  @override
  _LideresPageState createState() => _LideresPageState();
}

class _LideresPageState extends State<LideresPage> {
  String _dropdownValue = 'Puntos por Partido';

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        alignment: Alignment.topCenter,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            DropdownButton<String>(
              value: _dropdownValue,
              onChanged: (String? valorNou) {
                setState(() {
                  _dropdownValue = valorNou!;
                });
              },
              items: <String>[
                'Puntos por Partido',
                'Rebotes por partido',
                'Asistencias por Partido',
                'Tapones por Partido'
              ].map<DropdownMenuItem<String>>((String valor) {
                return DropdownMenuItem<String>(
                  value: valor,
                  child: Text(valor),
                );
              }).toList(),
            ),
            Expanded(
              child: Container(
                child: Center(
                  child: Text('Lideres page'),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
