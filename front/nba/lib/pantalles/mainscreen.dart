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
      LideresTab(temporada: temporada),
    ];
  }
  /*
  static const List<Widget> _widgetOptions = <Widget>[
    ClasificacionPage(temporada: widget.temporada),
    EquiposPage(temporada: widget.temporada),
    LideresTab(temporada: widget.temporada),
  ];*/

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: Scaffold(
        appBar: AppBar(
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

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
     return Scaffold(
      body: Column(
              children: <Widget>[
                TabBar(
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
                      Container(
                        child: Center(
                          child: Text('East tab content'),
                        ),
                      ),
                      Container(
                        child: Center(
                          child: Text('West tab content'),
                        ),
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

  void _toInfoEquipo(String equipo){
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: ((context) =>InfoEquipo(temporada: widget.temporada, equipo: equipo))
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
                return GestureDetector(
                  onTap: (() {
                    _toInfoEquipo(equipo);
                    }
                    ),
                  child: ListTile(
                  leading : new Image(image: new AssetImage("../../assets/${nombre}.png")),
                  title: Text(equipo['Ciudad']+" "+equipo['Nombre']),
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


class LideresTab extends StatefulWidget {
  const LideresTab({Key? key,required this.temporada}) : super(key: key);

  final String temporada;

  @override
  _LideresTabState createState() => _LideresTabState();
}

class _LideresTabState extends State<LideresTab> {
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
              onChanged: (String? newValue) {
                setState(() {
                  _dropdownValue = newValue!;
                });
              },
              items: <String>[
                'Puntos por Partido',
                'Rebotes por partido',
                'Asistencias por Partido',
                'Tapones por Partido'
              ].map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
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
