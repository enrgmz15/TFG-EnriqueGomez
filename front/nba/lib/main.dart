//import 'package:nba/pantalles/'
import 'package:flutter/material.dart';
import 'package:nba/pantalles/selector_temporada.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hoops Archive',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const SelectorTemporada(),
      },
    );
  }
}