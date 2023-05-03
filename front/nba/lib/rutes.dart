import 'dart:io';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future <dynamic> ClasiConferencia(String temp, String temp2, String conferencia) async {
  String url = 'http://localhost:8080/api/$temp/$temp2/$conferencia/clasificacion';

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