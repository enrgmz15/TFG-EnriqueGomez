import 'dart:io';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future <dynamic> ClasiConferencia(String temporada, String conferencia) async {
  String url = 'http://localhost:8080/api/$conferencia/clasificacion?temporada=$temporada';

  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}

Future <dynamic> Equipos() async {
  String url = 'http://localhost:8080/api/equipos';

  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}

Future <dynamic> JugadoresPorEquipo(String equipo) async {
  String url = 'http://localhost:8080/api/$equipo/jugadores';
  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}

Future <List> MaxPPP(String temporada) async {
  String url = 'http://localhost:8080/api/anotadores?temporada=$temporada';

  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}

Future <List> MaxAPP(String temporada) async {
  String url = 'http://localhost:8080/api/asistentes?temporada=$temporada';

  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}

Future <List> MaxRPP(String temporada) async {
  String url = 'http://localhost:8080/api/reboteadores?temporada=$temporada';

  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}

Future <List> MaxTPP(String temporada) async {
  String url = 'http://localhost:8080/api/taponadores?temporada=$temporada';

  http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == HttpStatus.ok) {
    String body = utf8.decode(response.bodyBytes);
    final result = jsonDecode(body);

    debugPrint(result.runtimeType.toString());
    return result;
  } else {
    throw Exception('No connecta');
  }
}