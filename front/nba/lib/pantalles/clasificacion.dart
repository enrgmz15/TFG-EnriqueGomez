import 'package:flutter/material.dart';

import 'package:flutter/material.dart';

class ClasificacionTemporada extends StatefulWidget {
  const ClasificacionTemporada({required this.temp, required this.temp2, required this.conferencia, super.key});

  final String temp;
  final String temp2;
  final String conferencia;

  @override
  State<ClasificacionTemporada> createState() => _clasificacion();
}

class _clasificacion extends State<ClasificacionTemporada>{
  late Future<dynamic> _listaClasificacion;

  @override
  void initState(){
    _listaClasificacion = ClasiConferencia()
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Material App Bar'),
      ),
      body: const Center(
        child: Text('Hello World'),
      ),
    );
  }
