import 'package:flutter/material.dart';
import 'package:nba/pantalles/mainscreen.dart';
import 'package:flutter/services.dart';
import 'package:flutter/src/material/colors.dart';
import 'package:flutter/src/material/material_state.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Selecciona una Temporada'),
        titleTextStyle: TextStyle(
          fontFamily: "Vintage",
          fontSize: 20,
          color: Colors.white
        ),
        backgroundColor: Colors.red,
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('../../assets/fondo1.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: GridView.count(
        crossAxisCount: 2,
        childAspectRatio: 3,
        mainAxisSpacing: 20, // Ajustar espaciado vertical
        crossAxisSpacing: 20, // Ajustar espaciado horizontal
        padding: EdgeInsets.all(10),
        
        children: List.generate(10, (index) {
          int startYear = 98 + index;
          int endYear = startYear + 1;
          String buttonText="";
          if(endYear>=100 || startYear>=100){
            if (endYear>=100){
              endYear=endYear-100;
              buttonText = '$startYear/0$endYear';
            }
              if (startYear>=100){
              startYear=startYear-100;
              buttonText = '0$startYear/0$endYear';
            }
          }
          else{
            buttonText = '$startYear/$endYear'; 
          }
          return ElevatedButton(
            child: Text(buttonText,
            style: TextStyle(
              fontSize: 20,
              fontFamily: "Vintage",
            ),),
            style: ButtonStyle(
              foregroundColor: MaterialStateProperty.all(Colors.white),
              backgroundColor: MaterialStateProperty.all(Colors.red),
              ),
            onPressed: () {              
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => MainScreen(temporada: buttonText),
                ),
              );
            },
          );
        }).toList(),
      ),
    ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'Botones en Columnas',
    theme: ThemeData(
        primarySwatch: Colors.grey,),
    home: MyHomePage(),
    debugShowCheckedModeBanner: false
  ));
}
