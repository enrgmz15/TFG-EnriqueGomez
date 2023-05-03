import 'package:flutter/material.dart';

class SelectorTemporada extends StatelessWidget{
  const SelectorTemporada({super.key});

  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(opacity: 1,
          image: AssetImage("../../assets/fondo1.jpg"),
          fit: BoxFit.cover)),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: const[
                    TempButton(nom: "05/06"),
                    TempButton(nom: "06/07")
                  ],),
                  SizedBox(height:20),
                  Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: const[
                    TempButton(nom: "03/04"),
                    TempButton(nom: "07/08")
                  ],)
              ],
            )))
        ),
      );
  }
}
class TempButton extends StatelessWidget {
  const TempButton({required this.nom, Key? key})
      : super(key: key);

  final String nom;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ClasificacionTemporada(especie: nom),
          ),
        );
      },
      child: Container(
        width: 220,
        height: 220,
        child: Ink(
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.5),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Center(
            child: Text(
              nom,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontWeight: FontWeight.w300,
                color: Colors.yellowAccent,
                fontSize: 40,
                shadows: [
                  Shadow(
                    offset: Offset(2, 2),
                    color: Colors.black,
                    blurRadius: 3,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}